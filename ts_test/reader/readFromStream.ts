#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import readFromStream from '../../ts/reader/readFromStream'
import Stream from 'ts-stream'
import uint8 from '../../ts/reader/type/uint8'
import fixedString from '../../ts/reader/type/fixedString'
import string from '../../ts/reader/type/string'
import readerForReaders from '../../ts/reader/readerForReaders'

function c (char: string): number {
  return char.charCodeAt(0)
}

test('reading simple stream of features', async t => {
  const points = await readFromStream(Stream.from([
    new Uint8Array([1, 2, c('a'), c('b')]),
    new Uint8Array([c('c'), 3]),
    new Uint8Array([4, c('d'), c('e'), c('f')])
  ]), readerForReaders([
    { name: 'x', reader: uint8 },
    { name: 'y', reader: uint8 },
    { name: 'desc', reader: fixedString(3) }
  ])).toArray()

  t.deepEquals(points, [
    { x: 1, y: 2, desc: 'abc' },
    { x: 3, y: 4, desc: 'def' }
  ])
})

test('reading dynamic simple stream of features', async t => {
  const data = [
    1,
    2,
    0, 0, 0, 3,
    c('a'), c('b'), c('c'),
    3,
    5,
    6,
    0, 0, 0, 2,
    c('d'), c('e'),
    7
  ]
  const points = await readFromStream(Stream.from([
    new Uint8Array(data.slice(0, 7)),
    new Uint8Array(data.slice(7, 14)),
    new Uint8Array(data.slice(14))
  ]), readerForReaders([
    { name: 'x', reader: uint8 },
    { name: 'y', reader: uint8 },
    { name: 'desc', reader: string },
    { name: 'z', reader: uint8 }
  ])).toArray()

  t.deepEquals(points, [
    { x: 1, y: 2, z: 3, desc: 'abc' },
    { x: 5, y: 6, z: 7, desc: 'de' }
  ])
})
