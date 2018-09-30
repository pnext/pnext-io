import { assertNumber } from './assertNumber'
import Long from 'long'

test('Basic tests', () => {
  expect(assertNumber(0)).toBe(0)
  expect(assertNumber(new Long(0))).toBe(0)
  expect(() => {
    assertNumber(Long.fromNumber(Number.MAX_SAFE_INTEGER).add(1))
  }).toThrowError()
})
