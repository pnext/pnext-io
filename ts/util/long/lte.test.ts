import { lte } from './lte'
import Long from 'long'

test('Basic tests', () => {
  function isLTE (a, b) {
    if (!lte(a, b)) {
      throw new Error(`${a}[${typeof a}] is expected to be lower or equals ${b}[${typeof b}]`)
    }
  }
  function isGT (a, b) {
    if (lte(a, b)) {
      throw new Error(`${a}[${typeof a}] is expected to be greater ${b}[${typeof b}]`)
    }
  }
  // Smaller numbers
  isLTE(0, 1)
  isLTE(1, Long.fromNumber(2))
  isLTE(Long.fromNumber(3), 4)

  // Equal numbers
  isLTE(5, 5)
  isLTE(6, Long.fromNumber(6))
  isLTE(Long.fromNumber(7), 7)

  // Greater Numbers
  isGT(9, 8)
  isGT(Long.fromNumber(11), 10)
  isGT(13, Long.fromNumber(12))
})
