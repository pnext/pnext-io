import path from 'path'
import { IFeedFS } from './IFeedFS'
import { IFeedRange } from './IFeedRange'
import { createReadStream, createMemManager, IMemManager } from './createReadStream'

export interface FolderFeedOptions {
  max?: number
  maxAge?: number
  interval?: number
  prefix?: string
}

export class FSFeed {
  options: FolderFeedOptions
  fs: IFeedFS
  memManager: IMemManager

  constructor (fs: IFeedFS, alloc: (size: number) => Uint8Array, options?: FolderFeedOptions) {
    this.fs = fs
    this.memManager = createMemManager(alloc)
    this.options = Object.assign({
      max: 5,
      maxAge: 1000,
      interval: 100,
      prefix: ''
    }, options)
  }

  createReadStream (location: string, range?: IFeedRange) {
    return createReadStream(this.fs, path.normalize(`${this.options.prefix}${location}`), range, this.memManager)
  }
}
