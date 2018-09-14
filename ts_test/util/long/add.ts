#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import { add } from '../../../ts/util/long/add'
import Long from 'long'

test('Basic tests', async t => {
  function assertLong (res: number | Long, value: Long, message?: string) {
    if (typeof res === 'number') {
      t.fail('Long is supposed to be returned if one is long')
    } else {
      t.ok(res.eq(value), `${res.toString()} is equals ${value.toString()} ${message ? `:${message}` : ''}`)
    }
  }
  t.equals(add(1, 1), 2)
  t.equals(add(Number.MAX_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER - 1), 18014398509481980)
  assertLong(add(new Long(2), 3), Long.fromNumber(5))
  assertLong(add(Number.MAX_SAFE_INTEGER, 1), Long.fromString('9007199254740992'))
  assertLong(add(1, Number.MAX_SAFE_INTEGER), Long.fromString('9007199254740992'))
})
