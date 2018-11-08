import { HttpFeed } from './HttpFeed'
import { createServer, IncomingMessage, ServerResponse, Server } from 'http'
import { IFeedRange } from './IFeedRange'
import { streamToString } from './streamToString'

let server: Server
let handleRequest: (request: IncomingMessage, response: ServerResponse) => void
let host: string

beforeAll(next => {
  server = createServer((req, res) => handleRequest(req, res))
  server.on('error', next)
  server.listen(() => {
    next()
  })
  host = getHost(server)
})

afterEach(() => {
  handleRequest = null
})

afterAll(next => server.close(next))

function getHost (server) {
  const address = server.address()
  if (typeof address === 'string') {
    return address
  }
  if (address.address === '::') {
    return `http://localhost:${address.port}`
  }
  return `http://${address.address}:${address.port}`
}

function respondToAll (message: ArrayBuffer | Buffer | Uint8Array | string, code: number = 200) {
  return (_, res: ServerResponse) => {
    res.statusCode = code
    res.write(message)
    res.end()
  }
}

test('Simple http request', async () => {
  handleRequest = respondToAll('hello world')
  const feed = new HttpFeed({}, host)
  expect(await streamToString(feed.createReadStream(''))).toBe('hello world')
})

test('Range request on fixed server', async () => {
  handleRequest = respondToAll('hello world')
  const feed = new HttpFeed({}, host)
  expect(await streamToString(feed.createReadStream('', { start: 2, end: 5 }))).toBe('llo')
})

function parseRange (range: string | string[]): IFeedRange {
  if (Array.isArray(range)) {
    range = range[0]
  }
  if (!range) {
    return null
  }
  const parts = /^(\d+)?-(\d+)?$/i.exec(range)
  if (!parts) {
    return null
  }
  let start: number = 0
  let end: number
  if (parts[1]) {
    start = parseInt(parts[1], 10)
  }
  if (parts[2]) {
    end = parseInt(parts[2], 10)
  }
  return { start, end }
}

function respectRange (message: Buffer) {
  return (req: IncomingMessage, res: ServerResponse) => {
    let msg = message
    if (req.headers.range) {
      res.statusCode = 206
      const range = parseRange(req.headers.range)
      msg = msg.slice(range.start, range.end)
    }
    res.write(msg)
    res.end()
  }
}

test('Range request on server that supports ranges', async () => {
  handleRequest = respectRange(Buffer.from('hello world'))
  const feed = new HttpFeed({}, host)
  expect(await streamToString(feed.createReadStream('/icon.ico', { start: 2, end: 5 }))).toBe('llo')
})

/*

function sleep (time: number) {
  return new Promise<void>(resolve => setTimeout(resolve, time))
}
Doesn't work yet!
test('Cancelling an open request', async () => {
  let closeCalled = false
  handleRequest = (request: IncomingMessage, response: ServerResponse) => {
    let closed = false
    response.on('close', () => {
      console.log('response closed???')
    })
    request.on('close', () => {
      console.log('close called')
      closeCalled = true
      closed = true
    })
    let count = 0
    function writeNext () {
      if (closed) {
        response.end()
        return
      }
      count++
      console.log('writing')
      response.write(`response #${count}`)
      setTimeout(writeNext, 50)
    }
    writeNext()
  }
  const feed = new HttpFeed({}, host)
  const stream = feed.createReadStream('')
  const received = []
  let outputEnded = false
  stream.forEach(
    (value: Uint8Array) => {
      received.push(value)
    },
    () => {
      outputEnded = true
    }
  ).catch()
  await sleep(10)
  console.log('now aborting')
  stream.abort(new Error('fun!'))
  expect(outputEnded).toBe(true)
  console.log('next')
  // lets make sure that the server had some time to finish
  await sleep(10)
  expect(closeCalled).toBe(true)
})
*/
