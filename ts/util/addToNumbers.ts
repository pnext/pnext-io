import Long from 'long'

export default function addTwoNumbers (a: number | Long, b: number | Long): number | Long {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      if (a < Number.MAX_SAFE_INTEGER && b < Number.MAX_SAFE_INTEGER) {
        return a + b
      }
      return Long.fromNumber(a).add(b)
    }
    return b.add(a)
  }
  return a.add(b)
}
