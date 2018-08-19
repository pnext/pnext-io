#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import IBox3 from '../ts/api/IBox3'
import { parseSlippy, slippyToString, slippyBounds, SLIPPY_ZERO, slippyParent, slippySphere } from '../ts/util/slippy'
import ISphere from '../ts/util/ISphere'

test('parseSlippy', async t => {

  t.deepEquals(
    parseSlippy('0-0-0-0'),
    { d: 0, x: 0, y: 0, z: 0 }
  , 'simple parser')

  t.deepEquals(
    parseSlippy('1-2-3-4'),
    { d: 1, x: 2, y: 3, z: 4 },
    'each dimension is mapped properly'
  )

  t.deepEquals(
    parseSlippy('99-999-9999-99999'),
    { d: 99, x: 999, y: 9999, z: 99999 },
    'dimension number is irrelevant'
  )

  try {
    parseSlippy('x-x-x-x')
  } catch (e) {
    return
  }
  t.fail('invalid id should throw an error')
})

test('slippyBounds', async t => {
  const boundsTestData: { [ k: string ]: IBox3 } = {
    '0-0-0-0': {
      min: { x: 0, y: 0, z: 0 },
      max: { x: 1, y: 1, z: 1 }
    },
    '1-0-0-0': {
      min: { x: 0, y: 0, z: 0 },
      max: { x: 0.5, y: 0.5, z: 0.5 }
    },
    '4-1-1-1': {
      min: { x: 1 / 16, y: 1 / 16, z: 1 / 16 },
      max: { x: 2 / 16, y: 2 / 16, z: 2 / 16 }
    }
  }

  for (const slippyId in boundsTestData) {
    const slippyMap = parseSlippy(slippyId)
    const expectedBounds = boundsTestData[slippyId]
    t.deepEquals(slippyBounds(slippyMap), expectedBounds, `bounds for ${slippyId}`)
    // Verify cache
    t.deepEquals(slippyBounds(slippyMap), expectedBounds, `verifying ${slippyId}`)
  }
})

test('slippyToString', async t => {
  t.equals(slippyToString({ d: 1, x: 2, y: 3, z: 4 }), '1-2-3-4', 'simply stringify')
})

test('slippyParent', async t => {
  const parentTestData: { [ k: string ]: string } = {
    '1-0-0-0': '0-0-0-0',
    '1-1-0-0': '0-0-0-0',
    '1-0-1-0': '0-0-0-0',
    '1-0-0-1': '0-0-0-0',
    '1-1-1-1': '0-0-0-0',
    '2-0-0-0': '1-0-0-0',
    '2-1-1-1': '1-0-0-0',
    '2-2-2-2': '1-1-1-1',
    '2-3-3-3': '1-1-1-1',
    '3-1-3-7': '2-0-1-3',
    '66-22-12-43': '65-11-6-21'
  }
  for (const childId in parentTestData) {
    const parentId = parentTestData[childId]
    t.deepEquals(slippyParent(parseSlippy(childId)), parseSlippy(parentId), `parent of ${childId}`)
  }
})

test('slippySphere', async t => {
  const sphereTestData: { [ k: string ]: ISphere } = {
    '0-0-0-0': {
      radius: 0.8660254037844386,
      center: { x: 0.5, y: 0.5, z: 0.5 }
    },
    '1-0-0-0': {
      radius: 0.4330127018922193,
      center: { x: 0.25, y: 0.25, z: 0.25 }
    },
    '4-1-2-3': {
      radius: 0.05412658773652741,
      center: { x: 0.09375, y: 0.15625, z: 0.21875 }
    }
  }
  for (const slippyId in sphereTestData) {
    const expectedSphere = sphereTestData[slippyId]
    t.deepEquals(slippySphere(parseSlippy(slippyId)), expectedSphere, `sphere of ${slippyId}`)
  }
})
