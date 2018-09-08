#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import addTwoNumbers from '../../ts/util/addToNumbers'
import Long from 'long'

test('Basic tests', async t => {
  function assertLong (res, value, message?: string) {
    if (typeof res === 'number') {
      t.fail('Long is supposed to be returned if one is long')
    } else {
      t.equals(res.toNumber(), value)
    }
  }
  t.equals(addTwoNumbers(1, 1), 2)
  t.equals(addTwoNumbers(Number.MAX_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER - 1), 18014398509481980)
  assertLong(addTwoNumbers(new Long(2), 3), 5)
  assertLong(addTwoNumbers(Number.MAX_SAFE_INTEGER, 1), 9007199254740992)
  assertLong(addTwoNumbers(1, Number.MAX_SAFE_INTEGER), 9007199254740992)
})
