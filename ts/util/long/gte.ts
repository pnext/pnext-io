import { lt } from './lt'

export function gte (a: number | Long, b: number | Long): boolean {
  return !lt(a, b)
}
