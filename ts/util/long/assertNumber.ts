export function assertNumber (val: number | Long): number {
  if (typeof val === 'number') {
    return val
  }
  if (val.gt(Number.MAX_SAFE_INTEGER) /* && val.lt(Number.MIN_SAFE_INTEGER) */) {
    throw new Error(`Value(${val.toString()}) is supposed to be within the 32 bit integer range (not Long!)!`)
  }
  return val.toNumber()
}
