#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import { sub } from '../../../ts/util/long/sub'
import Long from 'long'

test('Basic tests', async t => {
  function assertLong (res: number | Long, value: Long, message?: string) {
    if (typeof res === 'number') {
      t.fail('Long is supposed to be returned if one is long')
    } else {
      t.ok(res.eq(value), `${res.toString()} is equals ${value.toString()} ${message ? `(${message})` : ''}`)
    }
  }
  t.equals(sub(1, 1), 0, 'simple numbers')
  t.equals(sub(2, 1), 1, 'simple numbers 2')
  t.equals(sub(Number.MAX_SAFE_INTEGER, 1), 9007199254740990, 'high number integers')
  t.equals(sub(Long.fromNumber(Number.MAX_SAFE_INTEGER).add(3), 3), Number.MAX_SAFE_INTEGER, 'turning long into integer')
  assertLong(sub(Long.fromNumber(Number.MAX_SAFE_INTEGER).add(5), 3), Long.fromString('9007199254740993'), 'subtracting from a long enough to become a number')
  assertLong(sub(
     Long.fromString('432423442341414144'),
     Long.fromString('123344145666354242')
  ), Long.fromString('309079296675059902'), 'large numbers')
})
