export function eq (a: number | Long, b: number | Long): boolean {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      return a === b
    }
    return b.equals(a)
  }
  return a.equals(b)
}
