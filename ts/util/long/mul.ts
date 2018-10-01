import Long from 'long'

export function mul (a: number | Long, b: number | Long): number | Long {
  let long: Long
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      // TODO: There is an optimization step that can happen here
      //       By evaluating the possible result range, a * b could
      //       could be used if the result range doesn't exceed MAX_SAFE_INTEGER
      long = Long.fromNumber(a).mul(b)
    } else {
      long = b.mul(a)
    }
  } else {
    long = a.mul(b)
  }
  if (long.lte(Number.MAX_SAFE_INTEGER) && long.gte(Number.MIN_SAFE_INTEGER)) {
    return long.toNumber()
  }
  return long
}
