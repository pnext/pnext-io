import { IFeedRange } from './IFeedRange'

export class RangeError extends Error {
  code: string
  reason: string
  start: number
  end: number

  constructor (reason: string, start: number, end: number) {
    super(`${reason} [${start}-${end}]`)
    this.reason = reason
    this.code = 'ERANGE'
    this.start = start
    this.end = end
  }
}

export interface IValidatedRange {
  start: number,
  end?: number,
  rangeError?: RangeError
}

export function validateRange (range?: IFeedRange): IValidatedRange {
  let start = 0
  let end: number
  if (range) {
    start = range.start
    end = range.end
  }
  let rangeError: RangeError
  if (start === null || start === undefined) {
    start = 0
  } else if (start < 0) {
    rangeError = new RangeError(`start(${start}) needs to be bigger zero`, start, end)
  } else if (start > Number.MAX_SAFE_INTEGER) {
    rangeError = new RangeError(`start(${start}) is too big, max: ${Number.MAX_SAFE_INTEGER}`, start, end)
  } else if (end !== undefined) {
    if (end < start) {
      rangeError = new RangeError(`end(${end}) needs to be before the start(${start})`, start, end)
    } else if (end > Number.MAX_SAFE_INTEGER) {
      rangeError = new RangeError(`end(${end}) is too big, max: ${Number.MAX_SAFE_INTEGER}`, start, end)
    }
  }
  return {
    start,
    end,
    rangeError
  }
}
