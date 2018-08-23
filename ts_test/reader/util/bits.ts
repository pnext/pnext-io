#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import bits, { IBits } from '../../../ts/reader/util/bits'

function dArr (arr: number[]): DataView {
  const buff = new Uint8Array(arr)
  return new DataView(buff.buffer)
}

function read (parts: IBits, testData: number) {
  const c = { byteOffset: 0, size: 0, data: null }
  const reader = bits(parts)
  return reader.read(dArr([testData]), 0)
}

test('only first bit', async t => {
  const a = { 0: 'x' }
  t.deepEquals(read(a, 0), { x: 0 }, 'unset should be 0')
  t.deepEquals(read(a, 1), { x: 1 }, 'set should be 1')
})

test('only second bit', async t => {
  const b = { 1: 'y' }
  t.deepEquals(read(b, 0), { y: 0 }, 'unset should be 0')
  t.deepEquals(read(b, 1), { y: 0 }, 'setting other field should still be 0')
  t.deepEquals(read(b, 2), { y: 1 }, 'set should be 1')
  t.deepEquals(read(b, 3), { y: 1 }, 'set other as well should still be 1')
  t.deepEquals(read(b, 4), { y: 0 }, 'bigger field should still be 4')
})

test('multiple bits', async t => {
  const c = { 0: 'z', 1: 'z', 2: 'z' }
  t.deepEquals(read(c, 0), { z: 0 }, 'unset should be 0')
  t.deepEquals(read(c, 1), { z: 1 }, 'first field should be 1')
  t.deepEquals(read(c, 2), { z: 2 }, 'second field should be 2')
  t.deepEquals(read(c, 3), { z: 3 }, 'first and second field should together be 3')
  t.deepEquals(read(c, 4), { z: 4 }, 'only forth bit should be 4')
  t.deepEquals(read(c, 5), { z: 5 }, 'combination of 4 | 1')
  t.deepEquals(read(c, 6), { z: 6 }, 'combination of 4 | 2')
  t.deepEquals(read(c, 7), { z: 7 }, 'combination of 4 | 2 | 1')
  t.deepEquals(read(c, 8), { z: 0 }, 'higher fields should be ignored')
})

test('multiple bits with offset', async t => {
  const d = { 1: 'r', 2: 'r', 4: 'r' }
  t.deepEquals(read(d, 0), { r: 0 }, 'unset should be 0')
  t.deepEquals(read(d, 1), { r: 0 }, '1')
  t.deepEquals(read(d, 2), { r: 1 }, '2')
  t.deepEquals(read(d, 3), { r: 1 }, '3')
  t.deepEquals(read(d, 4), { r: 2 }, '4')
  t.deepEquals(read(d, 5), { r: 2 }, '5')
  t.deepEquals(read(d, 6), { r: 3 }, '6')
  t.deepEquals(read(d, 7), { r: 3 }, '7')
  t.deepEquals(read(d, 8), { r: 0 }, '8')
  t.deepEquals(read(d, 9), { r: 0 }, '9')
  t.deepEquals(read(d, 10), { r: 1 }, '10')
  t.deepEquals(read(d, 11), { r: 1 }, '11')
  t.deepEquals(read(d, 12), { r: 2 }, '12')
  t.deepEquals(read(d, 13), { r: 2 }, '13')
  t.deepEquals(read(d, 14), { r: 3 }, '14')
  t.deepEquals(read(d, 15), { r: 3 }, '15')
  t.deepEquals(read(d, 16), { r: 4 }, '16')
  t.deepEquals(read(d, 17), { r: 4 }, '17')
  t.deepEquals(read(d, 18), { r: 5 }, '18')
  t.deepEquals(read(d, 19), { r: 5 }, '19')
  t.deepEquals(read(d, 20), { r: 6 }, '20')
  t.deepEquals(read(d, 21), { r: 6 }, '21')
  t.deepEquals(read(d, 22), { r: 7 }, '22')
  t.deepEquals(read(d, 23), { r: 7 }, '23')
  t.deepEquals(read(d, 24), { r: 4 }, '24')
  t.deepEquals(read(d, 25), { r: 4 }, '25')
  t.deepEquals(read(d, 26), { r: 5 }, '26')
  t.deepEquals(read(d, 27), { r: 5 }, '27')
})

test('various fields', async t => {
  const e = { 0: 'a', 1: 'b', 2: 'a', 3: 'b', 4: 'c', 5: 'd', 6: 'e', 7: 'f' }
  const base = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 }
  t.deepEquals(read(e, 0), base, 'unset should be 0')
  t.deepEquals(read(e, 1), { ...base, a: 1 }, '1 should set a')
  t.deepEquals(read(e, 2), { ...base, b: 1 }, '2 should set b')
  t.deepEquals(read(e, 4), { ...base, a: 2 }, '4 should set a')
  t.deepEquals(read(e, 8), { ...base, b: 2 }, '8 should set b')
  t.deepEquals(read(e, 16), { ...base, c: 1 }, '16 should set c')
  t.deepEquals(read(e, 32), { ...base, d: 1 }, '32 should set d')
  t.deepEquals(read(e, 64), { ...base, e: 1 }, '64 should set e')
  t.deepEquals(read(e, 128), { ...base, f: 1 }, '128 should set f')
  t.deepEquals(read(e, 255), { a: 3, b: 3, c: 1, d: 1, e: 1, f: 1 }, 'all fields should be set')
})
