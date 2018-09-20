import { IFeed } from './IFeed'
import { IFeedRange } from './IFeedRange'
import { Stream } from 'ts-stream'
import { streamConv } from '../streamConv'
import LRU from 'lru-cache'
import { IdleItem } from './IdleItem'
import path from 'path'
import fs from 'fs'
import { Readable } from 'stream'

export interface FolderFeedOptions {
  max?: number
  maxAge?: number
  interval?: number
  prefix?: string
}

export interface IFeedFS {
  createReadStream (path: string, options: {
    flags?: string;
    fd?: number;
    mode?: number;
    autoClose?: boolean;
    start?: number;
    end?: number;
    highWaterMark?: number;
  }, cb: (err, stream) => {}): Readable
}

export class FSFeed extends IdleItem {
  cache?: { [location: string]: {
    fd: Promise<number>,
    location: string,
    expiration?: number,
    active: number
  }}
  options: FolderFeedOptions
  fs: IFeedFS
  interval

  constructor (fs: IFeedFS, options?: FolderFeedOptions) {
    super()
    this.fs = fs
    this.options = Object.assign({
      max: 5,
      maxAge: 1000,
      interval: 100,
      prefix: ''
    }, options)
  }

  isIdle () {
    return this.cache === undefined
  }

  createReadStream (location: string, range: IFeedRange) {
    const stream = new Stream<Uint8Array>()
    this.increase(location)
      .then((fd: number) => {
        const fsStream = fs.createReadStream(location, {
          fd,
          autoClose: false,
          start: range.start,
          end: range.end
        })
        fsStream.on('end', () => this.decrease(location))
        streamConv(fsStream, stream)
      })
    return stream
  }

  increase (location: string) {
    let cacheItem
    if (this.cache !== undefined) {
      cacheItem = this.cache[location]
    }
    if (cacheItem === undefined) {
      cacheItem = {
        location,
        fd: new Promise<number>((resolve, reject) => {
          const pth = this.pathForLocation(location)
          fs.open(pth, fs.constants.R_OK, (err, fd) => err ? reject(err) : resolve(fd))
        }),
        active: 0
      }
      if (this.cache === undefined) {
        this.cache = {}
        this.interval = setInterval(() => this.clear(), this.options.interval)
      }
      this.cache[location] = cacheItem
    }
    cacheItem.active += 1
    return cacheItem.fd
  }

  pathForLocation (location?: string) {
    if (typeof location !== 'string') {
      return this.options.prefix
    }
    return path.normalize(`${this.options.prefix}${location}`)
  }

  clear () {
    if (!this.cache) {
      return
    }
    let empty = true
    for (const cacheItem of Object.values(this.cache)) {
      if (cacheItem.active > 0) {
        empty = false
        continue
      }
      if (cacheItem.expiration > Date.now()) {
        empty = false
        continue
      }
      cacheItem.fd.then(fd => fs.closeSync(fd))
      delete this.cache[cacheItem.location]
    }
    if (empty) {
      this.cache = undefined
      clearInterval(this.interval)
      this.checkIdle()
    }
  }

  decrease (location: string) {
    const fd = this.cache[location]
    if (fd === undefined) {
      return
    }
    fd.active -= 1
    fd.expiration = Date.now() + this.options.maxAge
  }
}

export function createFSFeed (fs: IFeedFS, options?: FolderFeedOptions): FSFeed {
  return new FSFeed(fs, options)
}
