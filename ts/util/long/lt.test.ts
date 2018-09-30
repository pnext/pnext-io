import { lt } from './lt'
import Long from 'long'

test('Basic tests', () => {
  function isLT (a, b) {
    if (!lt(a, b)) {
      throw new Error(`${a}[${typeof a}] is expected to be lower ${b}[${typeof b}]`)
    }
  }
  function isGTE (a, b) {
    if (lt(a, b)) {
      throw new Error(`${a}[${typeof a}] is expected to be greater or equals ${b}[${typeof b}]`)
    }
  }
  // Smaller numbers
  isLT(0, 1)
  isLT(1, Long.fromNumber(2))
  isLT(Long.fromNumber(3), 4)

  // Equal numbers
  isGTE(5, 5)
  isGTE(6, Long.fromNumber(6))
  isGTE(Long.fromNumber(7), 7)

  // Greater Numbers
  isGTE(9, 8)
  isGTE(Long.fromNumber(11), 10)
  isGTE(13, Long.fromNumber(12))
})
