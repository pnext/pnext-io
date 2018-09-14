#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import { eq } from '../../../ts/util/long/eq'
import Long from 'long'

test('Basic tests', async t => {

  function ok (a, b) {
    t.ok(eq(a, b), `Equals ${a}[${typeof a}] == ${b}[${typeof b}]`)
  }

  function not (a, b) {
    t.ok(!eq(a, b), `!Not! Equals ${a}[${typeof a}] != ${b}[${typeof b}]`)
  }
  ok(0, 0)
  ok(Long.fromNumber(1), 1)
  ok(1, Long.fromNumber(1))
  ok(Long.fromNumber(1), Long.fromNumber(1))
  not(0, 1)
  not(Long.fromNumber(0), 1)
  not(0, Long.fromNumber(1))
  not(Long.fromNumber(0), Long.fromNumber(1))
})
