import { IReadable } from '../api/IReadable'
import { isPromiseLike } from './isPromiseLike'

export function filterStream<T> (input: IReadable<T>, filter: (input: T) => PromiseLike<boolean> | boolean): IReadable<T> {
  return {
    abort: (reason?: Error) => input.abort(reason),
    aborted: () => input.aborted(),
    result: () => input.result(),
    forEach (
      reader: (item: T) => PromiseLike<void> | void,
      ender: (error?: Error) => void,
      aborter: (error: Error) => void
    ) {
      return input.forEach(
        input => {
          const passing = filter(input)
          if (isPromiseLike(passing)) {
            return passing.then(passing => {
              if (passing) {
                return reader(input)
              }
            })
          }
          if (passing) {
            return reader(input)
          }
        },
        ender,
        aborter
      )
    }
  }
}
