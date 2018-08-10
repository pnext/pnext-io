#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import readFromStream from '../../ts/reader/readFromStream'
import Stream from 'ts-stream'
import readerForFeatures from '../../ts/reader/readerForFeatures'
import FeatureType from '../../ts/api/FeatureType'

function c (char: string): number {
  return char.charCodeAt(0)
}

test('reading simple stream of features', async t => {
  const points = await readFromStream(Stream.from([
    new Uint8Array([1, 2, c('a'), c('b')]),
    new Uint8Array([c('c'), 3]),
    new Uint8Array([4, c('d'), c('e'), c('f')])
  ]), readerForFeatures([
    { name: 'x', type: FeatureType.uint8 },
    { name: 'y', type: FeatureType.uint8 },
    { name: 'desc', type: FeatureType.fixedstring, length: 3 }
  ])).toArray()

  t.deepEquals(points, [
    { x: 1, y: 2, desc: 'abc' },
    { x: 3, y: 4, desc: 'def' }
  ])
})
