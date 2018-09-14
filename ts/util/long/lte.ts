import { gt } from './gt'

export function lte (a: number | Long, b: number | Long): boolean {
  return !gt(a, b)
}
