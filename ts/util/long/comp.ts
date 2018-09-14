import { gt } from './gt'

export function comp (a: number | Long, b: number | Long): number {
  if (gt(a, b)) return 1
  if (gt(b, a)) return -1
  return 0
}
