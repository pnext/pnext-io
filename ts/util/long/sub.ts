import Long from 'long'

function process (long: Long): number | Long {
  if (long.lte(Number.MAX_SAFE_INTEGER)) {
    return long.toNumber()
  }
  return long
}

export function sub (a: number | Long, b: number | Long): number | Long {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      if (a <= Number.MAX_SAFE_INTEGER && b <= Number.MAX_SAFE_INTEGER) {
        return a - b
      }
    }
    return process(new Long(a).subtract(b))
  }
  return process(a.subtract(b))
}
