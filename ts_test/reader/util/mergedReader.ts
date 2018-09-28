#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import readerForReaders from '../../../ts/reader/readerForReaders'
import uint8 from '../../../ts/reader/type/uint8'
import varint32 from '../../../ts/reader/type/varint32'
import { createWorkContext } from '../../../ts/reader/util/createWorkContext'
import { mergedReader } from '../../../ts/reader/util/mergedReader'

interface XY {
  x: number,
  y: number
}

interface Z {
  z: number
}

interface XYZ extends XY, Z {}

const xy = readerForReaders<XY>([
  { name: 'x', reader: uint8 },
  { name: 'y', reader: uint8 }
])

const xyDyn = readerForReaders<XY>([
  { name: 'x', reader: varint32 },
  { name: 'y', reader: varint32 }
])

const z = readerForReaders<Z>([
  { name: 'z', reader: uint8 }
])

const xyzType = {
  ...xy.type,
  ...z.type
}

function dArr (arr: number[]) {
  const buff = new Uint8Array(arr)
  return new DataView(buff.buffer)
}

function testReader (t, reader, target) {
  const ctx = createWorkContext()
  ctx.byteOffset = 1
  t.equals(reader.fixedSize, false, 'The reader is merged: we dont know the size')
  t.equals(reader.readDynamicTo(dArr([0, 1, 2, 3]), ctx, target), true, 'reading worked')
  t.equals(ctx.size, 3, 'Read three entries, size should be 3')
  t.equals(ctx.byteOffset, 4, 'The byteOffset works')
  t.equals(target, ctx.data, 'The target is passed as data')
  t.deepEquals(target, {
    x: 1,
    y: 2,
    z: 3
  }, 'The output contains the merged data')
}

function validatingZ (t, target) {
  return obj => {
    t.deepEquals(obj, {
      x: 1,
      y: 2
    }, 'The input alread contains the initial data')
    t.equals(obj, target, 'Same object that is passed to the context is passed-on')
    return z
  }
}

test('Simple merging of two readers.', async t => {
  const target = {}
  const partA = xy
  t.equals(partA.fixedSize, true, 'Just making sure that the reader is fixed')
  const reader = mergedReader<XYZ, XY>(partA, validatingZ(t, target), xyzType)
  testReader(t, reader, target)
})

test('Simple merging of two readers with one dynamic', async t => {
  const target = {}
  const partA = xyDyn
  t.equals(partA.fixedSize, false, 'Just making sure that the reader is dynamic')
  const reader = mergedReader<XYZ, XY>(partA, validatingZ(t, target), xyzType)
  testReader(t, reader, target)
})

test('Merging with null.', async t => {
  const ctx = createWorkContext()
  const target = {}
  const reader = mergedReader<XY, XY>(xy, obj => {
    return null
  }, xy.type)
  ctx.byteOffset = 1
  t.equals(reader.readDynamicTo(dArr([0, 1, 2, 3]), ctx, target), true, 'reading worked')
  t.equals(ctx.size, 2, 'Read three entries, size should be 2')
  t.equals(ctx.byteOffset, 3, 'The byteOffset works')
  t.deepEquals(target, {
    x: 1,
    y: 2
  }, 'The output contains the merged data')
})
