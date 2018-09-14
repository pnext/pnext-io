#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import { lt } from '../../../ts/util/long/lt'
import Long from 'long'

test('Basic tests', async t => {
  function isLT (a, b) {
    t.ok(lt(a, b), `${a}[${typeof a}] is lower ${b}[${typeof b}]`)
  }
  function isGTE (a, b) {
    t.ok(!lt(a, b), `${a}[${typeof a}] is greater or equals ${b}[${typeof b}]`)
  }
  // Smaller numbers
  isLT(0, 1)
  isLT(1, Long.fromNumber(2))
  isLT(Long.fromNumber(3), 4)

  // Equal numbers
  isGTE(5, 5)
  isGTE(6, Long.fromNumber(6))
  isGTE(Long.fromNumber(7), 7)

  // Greater Numbers
  isGTE(9, 8)
  isGTE(Long.fromNumber(11), 10)
  isGTE(13, Long.fromNumber(12))
})
