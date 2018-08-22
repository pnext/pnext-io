#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import twoPartReader from '../../../ts/reader/util/twoPartReader'
import uint32 from '../../../ts/reader/type/uint32'
import varuint32 from '../../../ts/reader/type/varuint32'
import fixedString from '../../../ts/reader/type/fixedString'
import nullReader from '../../../ts/reader/type/null'
import IDynamicContext from '../../../ts/reader/util/IDynamicContext'
import IReader from '../../../ts/reader/IReader'

const BYTE_128_STRING = '01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567'

function c (char: string) {
  return char.charCodeAt(0)
}

function chars (str: string) {
  const arr: number[] = []
  for (let i = 0; i < str.length; i++) {
    arr.push(str.charCodeAt(i))
  }
  return arr
}

function createRead (reader: IReader) {
  return (bytes: number[]) => {
    const ctx = { byteOffset: 0, data: null, size: 0 }
    const works = reader.readDynamic(new DataView(new Uint8Array(bytes).buffer), ctx)
    return { works, data: ctx.data, size: ctx.size }
  }
}

test('fixed, fixed', async t => {
  const reader = twoPartReader(uint32, fixedString)
  t.equals(reader.fixedSize, false)
  t.equals(reader.minSize, 4, 'minSize should be equal partA minSize')

  const read = createRead(reader)
  t.deepEquals(read([0, 0, 0, 3].concat(chars('ab'))), { works: false, data: null, size: 0 }, 'too small buffer doesnt work')
  t.deepEquals(read([0, 0, 0, 3].concat(chars('abc'))), { works: true, data: 'abc', size: 7 }, 'right size buffer works')
})

test('fixed, dynamic', async t => {
  const reader = twoPartReader(uint32, num => {
    t.equals(num, 4, 'former number properly read')
    return varuint32
  })
  t.equals(reader.fixedSize, false)
  t.equals(reader.minSize, 4, 'minSize should be equal partA minSize')

  const read = createRead(reader)
  t.deepEquals(read([0, 0, 0, 4]), { works: false, data: null, size: 0 }, 'too small buffer doesnt work')
  t.deepEquals(read([0, 0, 0, 4, 99]), { works: true, data: 99, size: 5 }, 'right size buffer works')
  t.deepEquals(read([0, 0, 0, 4, 255, 12]), { works: true, data: 1663, size: 6 }, 'string successfully read')
})

test('dynamic, fixed', async t => {
  const reader = twoPartReader(varuint32, fixedString)
  t.equals(reader.fixedSize, false, 'isnt fixed size')
  t.equals(reader.minSize, 1, 'minsize should be equal partA minSize')

  const read = createRead(reader)
  t.deepEquals(read([0]), { works: true, data: '', size: 1 }, 'empty string')
  t.deepEquals(read([1, c('a')]), { works: true, data: 'a', size: 2 }, 'single byte-size string')
  t.deepEquals(read([2].concat(chars(BYTE_128_STRING))), { works: true, data: '01', size: 3 }, 'single byte-size string, of a larger data set')
  t.deepEquals(read([128, 1].concat(chars(BYTE_128_STRING))), { works: true, data: BYTE_128_STRING, size: 130 }, 'double byte-size string')
})

test('dynamic, dynamic', async t => {
  const reader = twoPartReader(varuint32, num => {
    return varuint32
  })
  t.equals(reader.fixedSize, false, 'isnt fixed size')
  t.equals(reader.minSize, 1, 'minsize should be equal partA minSize')

  const read = createRead(reader)
  t.deepEquals(read([0]), { works: false, data: null, size: 0 }, 'missing second number')
  t.deepEquals(read([0, 0]), { works: true, data: 0, size: 2 }, 'working second number')
  t.deepEquals(read([128, 1, 128, 1]), { works: true, data: 128, size: 4 }, 'two dynamic sized numbers')
})
