import { FSFeed } from '../../../ts/reader/feed/FSFeed'
import fs from 'fs'
import { ReadableStream } from 'ts-stream'
import decodeUtf8 from 'decode-utf8'
import { streamToString as toString } from './streamToString'

test('Simple File stream abstracted', async () => {
  const feed = new FSFeed(fs, Buffer.allocUnsafe)
  const location = `${__dirname}/FSFeed.dummy`
  function range (start, end) {
    return feed.createReadStream(location, { start, end })
  }
  expect(await toString(range(0, 12))).toBe('1 abcdef\n2 g') // simply reading
  expect(await toString(range(11, 14))).toBe('ghi') // second reading works
  expect(await toString(range(14, 15))).toBe('j') // and even though not idle we can read
  const [a, b] = await Promise.all([
    toString(range(0, 3)),
    toString(range(3, 6))
  ])
  expect(`${a}-${b}`).toBe('1 a-bcd') // parallel streams
})
