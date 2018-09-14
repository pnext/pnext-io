export function lt (a: number | Long, b: number | Long): boolean {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      return a < b
    }
    return b.gt(a)
  }
  return a.lt(b)
}
