import { sub } from './sub'
import Long from 'long'

test('Basic tests', () => {
  function assertLong (res: number | Long, value: Long, message?: string) {
    if (typeof res === 'number') {
      throw new Error('Long is supposed to be returned if one is long')
    }
    if (!res.eq(value)) {
      throw new Error(`${res.toString()} is equals ${value.toString()} ${message ? `(${message})` : ''}`)
    }
  }
  expect(sub(1, 1)).toBe(0) // simple numbers
  expect(sub(2, 1)).toBe(1) // simple numbers 2
  expect(sub(Number.MAX_SAFE_INTEGER, 1)).toBe(9007199254740990) // high number integers
  expect(sub(Long.fromNumber(Number.MAX_SAFE_INTEGER).add(3), 3)).toBe(Number.MAX_SAFE_INTEGER) // turning long into integer
  assertLong(sub(Long.fromNumber(Number.MAX_SAFE_INTEGER).add(5), 3), Long.fromString('9007199254740993'), 'subtracting from a long enough to become a number')
  assertLong(sub(
     Long.fromString('432423442341414144'),
     Long.fromString('123344145666354242')
  ), Long.fromString('309079296675059902'), 'large numbers')
})
