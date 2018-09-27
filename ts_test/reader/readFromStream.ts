#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import Stream from 'ts-stream'
import { IReadable } from '../../ts/api/IReadable'
import IReader from '../../ts/reader/IReader'
import { readFromStream, readFromStreamTo } from '../../ts/reader/readFromStream'
import readerForReaders from '../../ts/reader/readerForReaders'
import fixedString from '../../ts/reader/type/fixedString'
import string from '../../ts/reader/type/string'
import uint8 from '../../ts/reader/type/uint8'
import { getAll } from '../../ts/util/getAll'

function toNum (buf: Buffer): number[] {
  const num = []
  for (let i = 0; i < buf.byteLength; i++) {
    num.push(buf[i])
  }
  return num
}

function fixChars (str: string) {
  return toNum(Buffer.from(str))
}

function chars (str: string) {
  const buf = Buffer.alloc(4)
  buf.writeUInt32BE(str.length, 0)
  return toNum(buf).concat(fixChars(str))
}

function fromStream<T> (stream: IReadable<Uint8Array>, reader: IReader<T>) {
  return getAll(readFromStream(stream, reader))
}

test('reading simple stream of features', async t => {
  const data = [1, 2]
    .concat(fixChars('abc'))
    .concat([3, 4])
    .concat(fixChars('def'))

  const points = await fromStream(
    Stream.from([
      new Uint8Array(data.slice(0, 4)),
      new Uint8Array(data.slice(4, 7)),
      new Uint8Array(data.slice(7))
    ]),
    readerForReaders([
      { name: 'x', reader: uint8 },
      { name: 'y', reader: uint8 },
      { name: 'desc', reader: fixedString(3) }
    ])
  )

  t.deepEquals(points, [
    { x: 1, y: 2, desc: 'abc' },
    { x: 3, y: 4, desc: 'def' }
  ])
})

test('reading dynamic simple stream of features', async t => {
  const data = [1, 2]
    .concat(chars('abc'))
    .concat([3, 5, 6 ])
    .concat(chars('de'))
    .concat([7])
  const reader = readerForReaders([
    { name: 'x', reader: uint8 },
    { name: 'y', reader: uint8 },
    { name: 'desc', reader: string },
    { name: 'z', reader: uint8 }
  ])
  const points = await fromStream(Stream.from([
    //
    // The stream-reader checks if enough data (minSize) is
    // available to continue reading. There was an arithmetic
    // error that dismissed a block if it was at the end
    // just the minSize. By cutting it at the minSize we can
    // make sure that this particular edge-case is accounted for.
    //
    new Uint8Array(data.slice(0, reader.minSize)),
    new Uint8Array(data.slice(reader.minSize, 14)),
    new Uint8Array(data.slice(14))
  ]), reader)

  t.deepEquals(points, [
    { x: 1, y: 2, z: 3, desc: 'abc' },
    { x: 5, y: 6, z: 7, desc: 'de' }
  ])
})

test('reading dynamic simple stream of features to a stream', async t => {
  const data = [1, 2]
    .concat(chars('abc'))
    .concat([3, 5, 6 ])
    .concat(chars('de'))
    .concat([7])
  const reader = readerForReaders([
    { name: 'x', reader: uint8 },
    { name: 'y', reader: uint8 },
    { name: 'desc', reader: string },
    { name: 'z', reader: uint8 }
  ])
  const out = new Stream<{ [key: string]: any}>()
  const all = getAll(out)
  await readFromStreamTo(Stream.from([
    //
    // The stream-reader checks if enough data (minSize) is
    // available to continue reading. There was an arithmetic
    // error that dismissed a block if it was at the end
    // just the minSize. By cutting it at the minSize we can
    // make sure that this particular edge-case is accounted for.
    //
    new Uint8Array(data.slice(0, reader.minSize)),
    new Uint8Array(data.slice(reader.minSize, 14)),
    new Uint8Array(data.slice(14))
  ]), reader, out)
  t.equals(out.isEnded(), false, 'The stream shouldnt be ended after all was passed')
  await out.end()
  const points = await all

  t.deepEquals(points, [
    { x: 1, y: 2, z: 3, desc: 'abc' },
    { x: 5, y: 6, z: 7, desc: 'de' }
  ])
})
