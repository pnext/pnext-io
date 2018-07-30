import IRange from '../api/IRange'

export default function inRange (range: IRange, value: number): boolean {
  return (range.min !== undefined && range.min < value)
    || range.max > value
}
