import readerForReaders from '../readerForReaders'
import uint8 from '../type/uint8'
import varint32 from '../type/varint32'
import { createWorkContext } from './createWorkContext'
import { mergedReader } from './mergedReader'
import { dArr } from './_test/dArr'

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

function testReader (reader, target) {
  const ctx = createWorkContext()
  ctx.byteOffset = 1
  expect(reader.fixedSize).toBe(false) // The reader is merged: we dont know the size
  expect(reader.readDynamicTo(dArr([0, 1, 2, 3]), ctx, target)).toBe(true) // reading worked
  expect(ctx.size).toBe(3) // Read three entries, size should be 3
  expect(ctx.byteOffset).toBe(4) // The byteOffset works
  expect(target).toBe(ctx.data) // The target is passed as data
  expect(target).toMatchObject({
    x: 1,
    y: 2,
    z: 3
  }) // The output contains the merged data
}

function validatingZ (target) {
  return obj => {
    expect(obj).toMatchObject({
      x: 1,
      y: 2
    }) // The input alread contains the initial data
    expect(obj).toBe(target) // Same object that is passed to the context is passed-on
    return z
  }
}

test('Simple merging of two readers.', () => {
  const target = {}
  const partA = xy
  expect(partA.fixedSize).toBe(true) // Just making sure that the reader is fixed
  const reader = mergedReader<XYZ, XY>(partA, validatingZ(target), xyzType)
  testReader(reader, target)
})

test('Simple merging of two readers with one dynamic', () => {
  const target = {}
  const partA = xyDyn
  expect(partA.fixedSize).toBe(false) // Just making sure that the reader is dynamic
  const reader = mergedReader<XYZ, XY>(partA, validatingZ(target), xyzType)
  testReader(reader, target)
})

test('Merging with null.', () => {
  const ctx = createWorkContext()
  const target = {}
  const reader = mergedReader<XY, XY>(xy, obj => {
    return null
  }, xy.type)
  ctx.byteOffset = 1
  expect(reader.readDynamicTo(dArr([0, 1, 2, 3]), ctx, target)).toBe(true) // reading worked
  expect(ctx.size).toBe(2) // Read three entries, size should be 2
  expect(ctx.byteOffset).toBe(3) // The byteOffset works
  expect(target).toMatchObject({
    x: 1,
    y: 2
  }) // The output contains the merged data
})
