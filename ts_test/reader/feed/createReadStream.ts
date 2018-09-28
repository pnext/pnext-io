#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import { createReadStream } from '../../../ts/reader/feed/createReadStream'
import { IFeedFS } from '../../../ts/reader/feed/IFeedFS'
import { streamToString } from './streamToString'
import { getAll } from '../../../ts/util/getAll'
import { combine } from '../../../ts/reader/util/combine'

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

test('A simple stream', async t => {
  const fs = dummyFS({ data: {
    x: new Uint8Array([1])
  } })
  t.deepEquals(await range(fs, 'x', 0), Buffer.from([1]), 'Simply reading data should work')
})

test('A stream of a null range', async t => {
  const fs = dummyFS({ data: {
    x: new Uint8Array([1, 2])
  } })
  t.deepEquals(await range(fs, 'x', 0, 0), Buffer.from([]), 'Length of 0 means empty range')
  t.deepEquals(await range(fs, 'x', 1, 1), Buffer.from([]), '... even with an offset')
  t.deepEquals(await range(fs, 'x', 2), Buffer.from([]), 'Also outside the datarange')
})

test('Erroneous requests', async t => {
  const fs = dummyFS({ data: {
    x: new Uint8Array([1])
  } })
  try {
    await range(fs, 'x', -1, 0)
    t.fail('passed without error')
  } catch (err) {
    t.equals(err.message, 'start(-1) needs to be bigger zero', 'start < 0')
  }
  try {
    await range(fs, 'x', Number.MAX_SAFE_INTEGER + 4)
    t.fail('passed without error')
  } catch (err) {
    t.equals(err.message, 'start(9007199254740996) is too big, max: 9007199254740991', 'start > Number.MAX.SAFE_INTEGER')
  }
  try {
    await range(fs, 'x', 0, Number.MAX_SAFE_INTEGER + 4)
    t.fail('passed without error')
  } catch (err) {
    t.equals(err.message, 'end(9007199254740996) is too big, max: 9007199254740991', 'end > Number.MAX.SAFE_INTEGER')
  }
  try {
    await range(fs, 'x', 1, 0)
    t.fail('passed without error')
  } catch (err) {
    t.equals(err.message, 'end(0) needs to be before the start(1)', 'end >= start')
  }
})

test('Aborting of a stream', async t => {
  const fs = dummyFS({
    data: {
      x: new Uint8Array([1])
    },
    readTimeout: 100
  })
  const stream = createReadStream(fs, 'x', { start: 0 }, Buffer.allocUnsafe)
  const testError = new Error('test-error')
  const streamDone = stream.forEach(
    () => t.fail('Item received even though the stream should have been closed.'),
    () => t.fail('Ender called even though the stream was aborted'),
    (error) => {
      t.equals(error, testError, 'Same error passed to aborter')
    }
  )
  stream.abort(testError)
})

test('Errors on open', async t => {
  const fs = dummyFS({
    data: {
      x: new Uint8Array([1])
    },
    openErr: true
  })
  try {
    await range(fs, 'x', 0, 1)
    t.fail('error not occurred')
  } catch (err) {
    t.equals(err.message, 'open-error', 'Error was passed through')
  }
})

test('Errors on close', async t => {
  const fs = dummyFS({
    data: {
      x: new Uint8Array([1])
    },
    closeErr: true
  })
  try {
    await range(fs, 'x', 0)
    t.fail('error not occurred')
  } catch (err) {
    t.equals(err.message, 'close-error', 'Error was passed through')
  }
})

test('Errors on read', async t => {
  const fs = dummyFS({
    data: {
      x: new Uint8Array([1])
    },
    readErr: true
  })
  try {
    await range(fs, 'x', 0)
    t.fail('error not occurred')
  } catch (err) {
    t.equals(err.message, 'read-error', 'Error was passed through')
  }
})

/*
test('Multiple streams at the same time')
test('Time delay in first buffer')
test('Time delay in two buffers')
*/
