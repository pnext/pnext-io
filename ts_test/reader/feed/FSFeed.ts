#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import { FSFeed } from '../../../ts/reader/feed/FSFeed'
import fs from 'fs'
import { ReadableStream } from 'ts-stream'
import decodeUtf8 from 'decode-utf8'

function combine (arr: Uint8Array[]) {
  const combined = new Uint8Array(arr.reduce((total, chunk) => total + chunk.length, 0))
  let offset = 0
  for (const chunk of arr) {
    combined.set(chunk, offset)
    offset += chunk.length
  }
  return combined
}

async function toString (stream: ReadableStream<Uint8Array>): Promise<string> {
  return decodeUtf8(combine(await stream.toArray()))
}

test('Simple File stream abstracted', async t => {
  const feed = new FSFeed(fs)
  const location = `${__dirname}/FSFeed.dummy`
  function range (start, end) {
    return { location, start, end }
  }
  t.equals(await toString(feed.createReadStream(range(0, 12))), '1 abcdef\n2 gh', 'simply reading')
  t.equals(feed.isIdle(), false, 'feed is not yet idle')
  await feed.onIdle()
  t.equals(feed.isIdle(), true, 'now feed is idle')
  t.equals(await toString(feed.createReadStream(range(11, 14))), 'ghij', 'second reading works')
  t.equals(feed.isIdle(), false, 'not idle yet')
  t.equals(await toString(feed.createReadStream(range(14, 15))), 'jk', 'and even though not idle we can read')
  const [a, b] = await Promise.all([
    toString(feed.createReadStream(range(0, 2))),
    toString(feed.createReadStream(range(3, 5)))
  ])
  t.equals(`${a}-${b}`, '1 a-bcd', 'parallel streams')
  await feed.onIdle()
})
