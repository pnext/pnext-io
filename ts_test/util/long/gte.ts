#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import { gte } from '../../../ts/util/long/gte'
import Long from 'long'

test('Basic tests', async t => {
  function isGTE (a, b) {
    t.ok(gte(a, b), `${a}[${typeof a}] is greater ${b}[${typeof b}]`)
  }
  function isLT (a, b) {
    t.ok(!gte(a, b), `${a}[${typeof a}] is lower or equals ${b}[${typeof b}]`)
  }
  // Greater numbers
  isGTE(1, 0)
  isGTE(2, Long.fromNumber(1))
  isGTE(Long.fromNumber(4), 3)

  // Equal numbers
  isGTE(5, 5)
  isGTE(6, Long.fromNumber(6))
  isGTE(Long.fromNumber(7), 7)

  // Smaller Numbers
  isLT(8, 9)
  isLT(Long.fromNumber(10), 11)
  isLT(12, Long.fromNumber(13))
})
