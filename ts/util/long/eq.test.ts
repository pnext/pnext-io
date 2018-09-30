import { eq } from './eq'
import Long from 'long'

test('Basic tests', () => {
  function ok (a, b) {
    if (!eq(a, b)) {
      throw new Error(`Equals ${a}[${typeof a}] == ${b}[${typeof b}]`)
    }
  }

  function not (a, b) {
    if (eq(a, b)) {
      throw new Error(`!Not! Equals ${a}[${typeof a}] != ${b}[${typeof b}]`)
    }
  }
  ok(0, 0)
  ok(Long.fromNumber(1), 1)
  ok(1, Long.fromNumber(1))
  ok(Long.fromNumber(1), Long.fromNumber(1))
  not(0, 1)
  not(Long.fromNumber(0), 1)
  not(0, Long.fromNumber(1))
  not(Long.fromNumber(0), Long.fromNumber(1))
})
