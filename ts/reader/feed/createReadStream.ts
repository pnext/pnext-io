import { IFeedFS } from './IFeedFS'
import { IFeedRange } from './IFeedRange'
import { IReadable } from '../../api/IReadable'
import { isPromiseLike } from '../../util/isPromiseLike'
import { createLazyPromise } from '../../util/createLazyPromise'

type BackPressure = (next: (() => PromiseLike<void> | void)) => PromiseLike<void> | void

const kMinPoolSpace = 128

class IPool {
  buffer: Uint8Array
  used: number
}

function sliceFromPool (pool: IPool, start: number, expectedEnd: number, actualEnd: number): Uint8Array {
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

let pool: IPool = undefined
let poolFragments: Uint8Array[] = []

function createPool (buffer: Uint8Array) {
  pool = {
    buffer,
    used: 0
  }
}

function createOrGetPool (highWaterMark: number, alloc: (size: number) => Uint8Array): IPool {
  if (pool === undefined || pool.buffer.length - pool.used < kMinPoolSpace) {
    // discard the old pool.
    if (poolFragments.length > 0) {
      createPool(poolFragments.pop())
    } else {
      createPool(alloc(highWaterMark))
    }
  }
  return pool
}

function createBackPressure (): BackPressure {
  let processing: PromiseLike<void> | null
  let working: boolean = false
  let error: Error = null

  function handleNext (next: () => PromiseLike<void> | null) {
    // We return null, but keep the processing reference.
    processing = next()
    if (processing) {
      processing
        .then(() => {
          // We clear the processing immediately after this is done.
          processing = null
        }, err => {
          // We can not do anything here, the error needs to be processed
          // when closing the stream.
          error = err
        })
    }
  }

  return (next: () => PromiseLike<void> | null): PromiseLike<void> | null => {
    if (error) {
      // If an error occured, just return that. Further processing aint needed
      return Promise.reject(error)
    }
    if (processing) {
      return processing.then(() => {
        handleNext(next)
      })
    }
    handleNext(next)
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

function ignore () { /* ... */ }

export function createReadStream (fs: IFeedFS, location: string, range: IFeedRange, alloc: (size: number) => Uint8Array, highWaterMark: number = 64 * 1024): IReadable<Uint8Array> {
  let isOpened = false
  let isAborted = false
  const aborted = createLazyPromise<void>()
  const fdP = open(fs, location)
  const result = createLazyPromise<void>(() => fdP.then(fd => {
    return close(fs, fd)
  }))
  result.catch(ignore)
  aborted.catch(ignore)
  fdP.catch(ignore)
  let { start, end, rangeError } = validateRange(range)
  return {
    abort (reason: Error): void {
      if (isAborted) {
        // Todo: should this throw an error?
        return
      }
      isOpened = true
      isAborted = true
      aborted.reject(reason)
      result.reject(reason)
    },
    aborted: () => aborted,
    result: () => result,
    forEach: (
      reader: (item: Uint8Array) => PromiseLike<void> | void,
      ender?: (error?: Error) => void,
      aborter?: (error: Error) => void
    ): Promise<void> => {
      if (aborter) {
        aborted.catch(aborter)
      }
      if (ender) {
        result.then(() => ender(), ender)
      }
      if (isOpened) {
        return Promise.reject(new Error('Can be opened only once!'))
      }
      isOpened = true
      if (rangeError) {
        isAborted = true
        result.reject(rangeError)
        return result
      }
      if (end === start) {
        // We are done!
        result.resolve()
        return result
      }
      const backPressure = createBackPressure()
      fdP.then(fd => {
        const pool = createOrGetPool(highWaterMark, alloc)
        function readNext () {
          if (isAborted) {
            return
          }
          const toRead = Math.min(
            end - start,
            pool.buffer.length - pool.used,
            highWaterMark
          )
          if (toRead === 0) {
            return backPressure(() => result.resolve())
          }
          const poolStart = pool.used
          const poolEnd = poolStart + toRead
          pool.used = poolEnd
          fs.read(fd, pool.buffer, poolStart, toRead, start, (err: Error, bytesRead: number) => {
            if (isAborted) {
              return
            }
            if (err) {
              return backPressure(() => result.reject(err))
            }
            if (bytesRead === 0) {
              return backPressure(() => result.resolve())
            }
            const data = sliceFromPool(pool, poolStart, poolEnd, poolStart + bytesRead)
            const res = backPressure(() => reader(data))
            // If the backPressure is busy, wait until next work is done.
            isPromiseLike(res)
              ? res.then(readNext, result.reject)
              : readNext()
          })
          if (start !== undefined) {
            start += toRead
          }
        }
        readNext()
      }, err => result.reject(err))
      return result
    }
  }
}
