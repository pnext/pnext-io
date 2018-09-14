#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import { lte } from '../../../ts/util/long/lte'
import Long from 'long'

test('Basic tests', async t => {
  function isLTE (a, b) {
    t.ok(lte(a, b), `${a}[${typeof a}] is lower ${b}[${typeof b}]`)
  }
  function isGT (a, b) {
    t.ok(!lte(a, b), `${a}[${typeof a}] is greater or equals ${b}[${typeof b}]`)
  }
  // Smaller numbers
  isLTE(0, 1)
  isLTE(1, Long.fromNumber(2))
  isLTE(Long.fromNumber(3), 4)

  // Equal numbers
  isLTE(5, 5)
  isLTE(6, Long.fromNumber(6))
  isLTE(Long.fromNumber(7), 7)

  // Greater Numbers
  isGT(9, 8)
  isGT(Long.fromNumber(11), 10)
  isGT(13, Long.fromNumber(12))
})
