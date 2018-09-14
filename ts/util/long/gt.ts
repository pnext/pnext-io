export function gt (a: number | Long, b: number | Long): boolean {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      return a > b
    }
    return b.lt(a)
  }
  return a.gt(b)
}
