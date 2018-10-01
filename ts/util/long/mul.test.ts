import { mul } from './mul'
import Long from 'long'

test('small number * small number', () => {
  expect(mul(1, 1)).toBe(1)
  expect(mul(1, 3)).toBe(3)
  expect(mul(10, 10)).toBe(100)
  expect(mul(-1, 1)).toBe(-1)
  expect(mul(1, -1)).toBe(-1)
})

test('small long * small long', () => {
  expect(mul(Long.fromNumber(1), Long.fromNumber(1))).toBe(1)
  expect(mul(Long.fromNumber(1), Long.fromNumber(3))).toBe(3)
  expect(mul(Long.fromNumber(10), Long.fromNumber(10))).toBe(100)
  expect(mul(Long.fromNumber(-1), Long.fromNumber(1))).toBe(-1)
  expect(mul(Long.fromNumber(1), Long.fromNumber(-1))).toBe(-1)
})

function testLong (input: number | Long, toBe: string) {
  if (typeof input === 'number') {
    throw new Error('long expected')
  }
  expect(input.toString()).toBe(toBe)
}

test('small long * small number', () => {
  expect(mul(Long.fromNumber(1), 1)).toBe(1)
})
test('small number * small long', () => {
  expect(mul(1, Long.fromNumber(1))).toBe(1)
})

test('= large number', () => {
  expect(mul(99999999, 9999999)).toBe(999999890000001) // Less than Number.MAX_SAFE_INTEGER
  testLong(mul(99999999, 99999999), '9999999800000001')
})
