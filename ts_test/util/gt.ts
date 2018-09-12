#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import gt from '../../ts/util/gt'
import Long from 'long'

test('Basic tests', async t => {
  function isGT (a, b) {
    t.ok(gt(a, b), `${a} is greater ${b}`)
  }
  function isLTE (a, b) {
    t.ok(!gt(a, b), `${a} is not greater ${b}`)
  }
  isGT(1, 0)
  isGT(Long.fromNumber(1), 0)
  isLTE(Long.fromNumber(1), 2)
  isLTE(2, Long.fromNumber(3))
  isGT(4, Long.fromNumber(3))
})
