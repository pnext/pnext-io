#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import { assertNumber } from '../../../ts/util/long/assertNumber'
import Long from 'long'

test('Basic tests', async t => {
  t.equals(assertNumber(0), 0)
  t.equals(assertNumber(new Long(0)), 0)
  t.throws(() => {
    assertNumber(Long.fromNumber(Number.MAX_SAFE_INTEGER).add(1))
  })
})
