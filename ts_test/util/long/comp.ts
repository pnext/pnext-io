#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import { comp } from '../../../ts/util/long/comp'
import Long from 'long'

test('Basic tests', async t => {
  const ZERO = new Long(0)
  const THREE = new Long(3)
  const FIVE = new Long(5)
  const SIX = new Long(6)
  const EIGHT = new Long(8)
  t.deepEquals(
    [THREE, 1, 3, 4, 2, 7, ZERO, 5, FIVE, EIGHT, SIX].sort(comp),
    [ZERO, 1, 2, THREE, 3, 4, 5, FIVE, SIX, 7, EIGHT],
    'Sorting should preserve the order and be ascending'
  )
})
