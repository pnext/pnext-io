import { add } from './add'
import Long from 'long'

test('Basic tests', () => {
  function assertLong (res: number | Long, value: Long, message?: string) {
    if (typeof res === 'number') {
      throw new Error('Long is supposed to be returned if one is long')
    } else {
      if (!res.eq(value)) {
        throw new Error(`${res.toString()} is equals ${value.toString()} ${message ? `:${message}` : ''}`)
      }
    }
  }
  expect(add(1, 1)).toBe(2)
  expect(add(Number.MAX_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER - 1)).toBe(18014398509481980)
  assertLong(add(new Long(2), 3), Long.fromNumber(5))
  assertLong(add(Number.MAX_SAFE_INTEGER, 1), Long.fromString('9007199254740992'))
  assertLong(add(1, Number.MAX_SAFE_INTEGER), Long.fromString('9007199254740992'))
})
