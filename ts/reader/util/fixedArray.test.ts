import { fixedArray } from './fixedArray'
import uint8 from '../type/uint8'
import { dArr } from './_test/dArr'
import varbytes from '../type/varbytes';

test('simple reading test', () => {
  const reader = fixedArray(uint8, 2)
  expect(reader.minSize).toBe(uint8.minSize * 2)
  const target = {}
  reader.readTo(dArr([1, 2, 3]), 1, target)
  expect(target).toMatchObject({
    '0': 2,
    '1': 3
  })
})

test('dynamic reader dont work', () => {
  expect(() => fixedArray(varbytes, 2)).toThrow()
})

test('Minimum size of 1', () => {
  expect(() => fixedArray(uint8, 0)).toThrow()
  expect(() => fixedArray(uint8, -1)).toThrow()
})