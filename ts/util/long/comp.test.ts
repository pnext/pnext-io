import { comp } from './comp'
import Long from 'long'

test('Basic tests', () => {
  const ZERO = new Long(0)
  const THREE = new Long(3)
  const FIVE = new Long(5)
  const SIX = new Long(6)
  const EIGHT = new Long(8)
  // Sorting should preserve the order and be ascending
  expect(
    [THREE, 1, 3, 4, 2, 7, ZERO, 5, FIVE, EIGHT, SIX].sort(comp)
  ).toMatchObject(
    [ZERO, 1, 2, THREE, 3, 4, 5, FIVE, SIX, 7, EIGHT]
  )
})
