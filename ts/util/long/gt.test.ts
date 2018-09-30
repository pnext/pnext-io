import { gt } from './gt'
import Long from 'long'

test('Basic tests', () => {
  function isGT (a, b) {
    if (!gt(a, b)) {
      throw new Error(`${a}[${typeof a}] is expected to be greater ${b}[${typeof b}]`)
    }
  }
  function isLTE (a, b) {
    if (gt(a, b)) {
      throw new Error(`${a}[${typeof a}] is expected to be lower or equals ${b}[${typeof b}]`)
    }
  }
  // Greater numbers
  isGT(1, 0)
  isGT(2, Long.fromNumber(1))
  isGT(Long.fromNumber(4), 3)

  // Equal numbers
  isLTE(5, 5)
  isLTE(6, Long.fromNumber(6))
  isLTE(Long.fromNumber(7), 7)

  // Smaller Numbers
  isLTE(8, 9)
  isLTE(Long.fromNumber(10), 11)
  isLTE(12, Long.fromNumber(13))
})
