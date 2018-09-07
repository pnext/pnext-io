#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import readerForReaders from '../../ts/reader/readerForReaders'
import uint8 from '../../ts/reader/type/uint8'
import string from '../../ts/reader/type/string'
import FeatureType from '../../ts/api/FeatureType'

function chars (str: string) {
  const buf = Buffer.alloc(4)
  buf.writeUInt32BE(str.length, 0)
  const num: number[] = []
  const totalBuf = Buffer.concat([buf, Buffer.from(str)])
  for (let i = 0; i < totalBuf.byteLength; i++) {
    num.push(totalBuf[i])
  }
  return num
}

test('static, static, dynamic, static', async t => {
  const reader = readerForReaders([
    { name: 'x', reader: uint8 },
    { name: 'y', reader: uint8 },
    { name: 'desc', reader: string },
    { name: 'r', reader: uint8 }
  ])
  t.equals(reader.fixedSize, false, 'Since one property is dynamic (string), the combined reader should be dynamic')
  t.deepEquals(reader.type, {
    x: FeatureType.uint8,
    y: FeatureType.uint8,
    desc: FeatureType.string,
    r: FeatureType.uint8
  }, 'The types should be properly combined')
  const nums = [].concat(8, 1, 2, chars('Hello World'), 3)
  const view = new DataView(new Uint8Array(nums).buffer, 0)
  const target = {}
  const context = { byteOffset: 1, data: null, size: 0 }
  t.equals(reader.readDynamicTo(view, context, target), true, 'Able to read the data.')
  t.equals(context.byteOffset, 19, 'The offset should be properly passed on.')
  t.equals(context.size, context.byteOffset - 1, 'As it started from 1, the size should be one smaller')
  t.equals(context.data, target, 'The target has been passed to the context.')
  t.deepEquals(target, {
    x: 1,
    y: 2,
    desc: 'Hello World',
    r: 3
  }, 'The resulting data is as expected.')
})
