import { createReadStream, RangeError } from './createReadStream'
import { IFeedFS } from './IFeedFS'
import { streamToString } from './streamToString'
import { getAll } from '../../util/getAll'
import { combine } from '../util/combine'

function dummyFS (opts: {
  data?: { [location: string]: Uint8Array },
  openErr?: boolean,
  closeErr?: boolean,
  readErr?: boolean,
  readTimeout?: number
} = {}): IFeedFS {
  opts = Object.assign({
    data: {},
    readTimeout: 10
  }, opts)
  let lastFd = 0
  const locByFd: { [fd: number]: string } = {}
  return {
    open (location: string, flags: number, cb: (err: Error, fd?: number) => void): void {
      setImmediate(() => {
        if (opts.openErr) return cb(new Error('open-error'))
        if (!opts.data[location]) return cb(new Error('not-found'))
        const fd = lastFd ++
        locByFd[fd] = location
        cb(null, fd)
      })
    },
    close (fd: number, cb: (err: Error) => void): void {
      setImmediate(() => {
        if (opts.closeErr) return cb(new Error('close-error'))
        const loc = locByFd[fd]
        if (!loc) return cb(new Error('invalid-fd'))
        delete locByFd[fd]
        cb(null)
      })
    },
    read (fd: number, target: Uint8Array, bufferOffset: number, length: number, start: number, cb: (err: Error, bytesRead?: number) => void): void {
      setTimeout(() => {
        if (opts.readErr) return cb(new Error('read-error'))
        const loc = locByFd[fd]
        if (!loc) return cb(new Error(`invalid-fd#${fd}: available: ${Object.keys(locByFd)}`))
        const buffer = opts.data[loc]
        if (start >= buffer.length) return cb(null, 0)
        let bytesRead
        for (bytesRead = 0; bytesRead < length && start < buffer.length; bytesRead++, start++) {
          target[start] = buffer[start]
        }
        cb(null, bytesRead)
      }, opts.readTimeout)
    }
  }
}

async function range (fs: IFeedFS, location: string, start: number, end?: number) {
  return combine(await getAll(createReadStream(fs, location, { start, end }, Buffer.allocUnsafe)))
}

test('A simple stream', async () => {
  const fs = dummyFS({ data: {
    x: new Uint8Array([1])
  } })
  expect(await range(fs, 'x', 0)).toMatchObject(new Uint8Array([1])) // Simply reading data should work
})

test('A stream of a null range', async () => {
  const fs = dummyFS({ data: {
    x: new Uint8Array([1, 2])
  } })
  expect(await range(fs, 'x', 0, 0)).toMatchObject(new Uint8Array([])) // Length of 0 means empty range
  expect(await range(fs, 'x', 1, 1)).toMatchObject(new Uint8Array([])) // ... even with an offset
  expect(await range(fs, 'x', 2)).toMatchObject(new Uint8Array([])) // Also outside the datarange
})

test('Erroneous requests', async () => {
  const fs = dummyFS({ data: {
    x: new Uint8Array([1])
  } })
  await expect(range(fs, 'x', -1, 0))
    .rejects.toMatchObject(new RangeError('start(-1) needs to be bigger zero')) // start < 0
  await expect(range(fs, 'x', Number.MAX_SAFE_INTEGER + 4))
    .rejects.toMatchObject(new RangeError('start(9007199254740996) is too big, max: 9007199254740991')) // start > Number.MAX.SAFE_INTEGER
  await expect(range(fs, 'x', 0, Number.MAX_SAFE_INTEGER + 4))
    .rejects.toMatchObject(new RangeError('end(9007199254740996) is too big, max: 9007199254740991')) // end > Number.MAX.SAFE_INTEGER
  await expect(range(fs, 'x', 1, 0))
    .rejects.toMatchObject(new RangeError('end(0) needs to be before the start(1)')) // end >= start
})

test('Aborting of a stream', async () => {
  const fs = dummyFS({
    data: {
      x: new Uint8Array([1])
    },
    readTimeout: 100
  })
  const stream = createReadStream(fs, 'x', { start: 0 }, Buffer.allocUnsafe)
  const testError = new Error('test-error')
  let order = 0
  const streamDone = stream.forEach(
    () => { throw new Error('Item received even though the stream should have been closed.') },
    (error) => {
      expect(order++).toBe(1)
      expect(error).toBe(testError)
    },
    (error) => {
      expect(order++).toBe(0)
      expect(error).toBe(testError) // Same error passed to aborter
    }
  )
  stream.abort(testError)
  await expect(stream.aborted()).rejects.toBe(testError)
})

test('Errors on open', async () => {
  const fs = dummyFS({
    data: {
      x: new Uint8Array([1])
    },
    openErr: true
  })
  await expect(range(fs, 'x', 0, 1)).rejects.toMatchObject(new Error('open-error')) // Error was passed through
})

test('Errors on close', async () => {
  const fs = dummyFS({
    data: {
      x: new Uint8Array([1])
    },
    closeErr: true
  })
  await expect(range(fs, 'x', 0)).rejects.toMatchObject(new Error('close-error')) // Error was passed through
})

test('Errors on read', async () => {
  const fs = dummyFS({
    data: {
      x: new Uint8Array([1])
    },
    readErr: true
  })
  await expect(range(fs, 'x', 0)).rejects.toMatchObject(new Error('read-error')) // Error was passed through
})

/*
test('Multiple streams at the same time')
test('Time delay in first buffer')
test('Time delay in two buffers')
*/
