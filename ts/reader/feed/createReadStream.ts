import { IFeedFS } from './IFeedFS'
import { IFeedRange } from './IFeedRange'
import { IReadable } from '../../api/IReadable'
import { StreamState } from './StreamState'

class IPool {
  buffer: Uint8Array
  used: number
}

export interface IMemManager {
  highWaterMark: number
  createOrGetPool (): IPool
  sliceFromPool (pool: IPool, start: number, expectedEnd: number, actualEnd: number): Uint8Array
}

export function createMemManager (alloc: (size: number) => Uint8Array, highWaterMark: number = 64 * 1024, kMinPoolSpace: number = 128): IMemManager {
  let pool: IPool = undefined
  let poolFragments: Uint8Array[] = []

  return {
    highWaterMark,
    createOrGetPool (): IPool {
      if (pool === undefined || pool.buffer.length - pool.used < kMinPoolSpace) {
        // discard the old pool.
        pool = {
          buffer: poolFragments.length > 0
            ? poolFragments.pop()
            : alloc(highWaterMark),
          used: 0
        }
      }
      return pool
    },
    sliceFromPool (pool: IPool, start: number, expectedEnd: number, actualEnd: number): Uint8Array {
      // Now that we know how much data we have actually read, re-wind the
      // 'used' field if we can, and otherwise allow the remainder of our
      // reservation to be used as a new pool later.
      if (expectedEnd === pool.used) {
        pool.used = start
      } else if (expectedEnd - actualEnd > kMinPoolSpace) {
        poolFragments.push(pool.buffer.slice(actualEnd, expectedEnd))
      }
      return pool.buffer.slice(start, actualEnd)
    }
  }
}

export class RangeError extends Error {
  code: string
  constructor (message: string) {
    super(message)
    this.code = 'ERANGE'
  }
}

function validateRange (range: IFeedRange) {
  let start = range.start
  let end = range.end
  let rangeError: RangeError
  if (start === null || start === undefined) {
    start = 0
  } else if (start < 0) {
    rangeError = new RangeError(`start(${start}) needs to be bigger zero`)
  } else if (start > Number.MAX_SAFE_INTEGER) {
    rangeError = new RangeError(`start(${start}) is too big, max: ${Number.MAX_SAFE_INTEGER}`)
  } else if (end === undefined) {
    end = Infinity
  } else if (end < start) {
    rangeError = new RangeError(`end(${end}) needs to be before the start(${start})`)
  } else if (end > Number.MAX_SAFE_INTEGER) {
    rangeError = new RangeError(`end(${end}) is too big, max: ${Number.MAX_SAFE_INTEGER}`)
  }
  return {
    start,
    end,
    rangeError
  }
}

const R_OK: number = 4

function open (fs: IFeedFS, location: string) {
  return new Promise<number>((resolve, reject) =>
    fs.open(location, R_OK, (err: Error, fd: number) =>
      err ? reject(err) : resolve(fd)
    )
  )
}

function close (fs: IFeedFS, fd: number) {
  return new Promise<void>((resolve, reject) =>
    fs.close(fd, (err: Error) =>
      err ? reject(err) : resolve()
    )
  )
}

export function createReadStream (fs: IFeedFS, location: string, range: IFeedRange, memManager: IMemManager): IReadable<Uint8Array> {
  const fdP = open(fs, location)
  const state = new StreamState<Uint8Array>(
    (error?: Error) =>
      fdP
        .then(fd => close(fs, fd))
        .then(() => error && Promise.reject(error))
  )
  state.next(() => {
    let { start, end, rangeError } = validateRange(range)
    if (rangeError !== undefined) {
      return state.end(rangeError)
    }
    if (end === start) {
      // We are done!
      return state.end()
    }
    fdP.then(
      fd => {
        const pool = memManager.createOrGetPool()
        function readNext () {
          const toRead = Math.min(
            end - start,
            pool.buffer.length - pool.used,
            memManager.highWaterMark
          )
          if (toRead === 0) {
            return state.end()
          }
          const poolStart = pool.used
          const poolEnd = poolStart + toRead
          pool.used = poolEnd
          fs.read(fd, pool.buffer, poolStart, toRead, start, (err: Error, bytesRead: number) => {
            if (state.done) {
              return
            }
            if (err) {
              return state.end(err)
            }
            if (bytesRead === 0) {
              return state.end()
            }
            const data = memManager.sliceFromPool(pool, poolStart, poolEnd, poolStart + bytesRead)
            state.push(data)
            state.next(readNext)
          })
          if (start !== undefined) {
            start += toRead
          }
        }
        readNext()
      },
      err => state.end(err)
    )
  })
  return state
}
