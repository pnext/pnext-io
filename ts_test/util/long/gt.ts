#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import { gt } from '../../../ts/util/long/gt'
import Long from 'long'

test('Basic tests', async t => {
  function isGT (a, b) {
    t.ok(gt(a, b), `${a}[${typeof a}] is greater ${b}[${typeof b}]`)
  }
  function isLTE (a, b) {
    t.ok(!gt(a, b), `${a}[${typeof a}] is lower or equals ${b}[${typeof b}]`)
  }
  // Greater numbers
  isGT(1, 0)
  isGT(2, Long.fromNumber(1))
  isGT(Long.fromNumber(4), 3)

  // Equal numbers
  isLTE(5, 5)
  isLTE(6, Long.fromNumber(6))
  isLTE(Long.fromNumber(7), 7)

  // Smaller Numbers
  isLTE(8, 9)
  isLTE(Long.fromNumber(10), 11)
  isLTE(12, Long.fromNumber(13))
})
