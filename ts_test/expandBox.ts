#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import expandBox from '../ts/util/expandBox'
import IBox3 from '../ts/api/IBox3'

function createBox (): IBox3 {
  return {
    min: { x: 0, y: 0, z: 0 },
    max: { x: 0, y: 0, z: 0 }
  }
}

test('expanding a box returns a new box', async t => {
  const a = createBox()
  const b = createBox()
  const expanded = expandBox(a, b)
  t.notEquals(expanded, a)
})

test('expanding a box returns a new box', async t => {
  const a = createBox()
  a.max.x = 1
  a.min.y = -2
  a.max.z = 3
  const b = createBox()
  b.min.x = -1
  b.max.y = 2
  b.min.z = -3
  const expanded = expandBox(a, b)
  t.deepEquals(expanded, {
    min: { x: -1, y: -2, z: -3 },
    max: { x: 1, y: 2, z: 3 }
  })
})
