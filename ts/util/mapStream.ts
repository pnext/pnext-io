import { IReadable } from '../api/IReadable'
import { isPromiseLike } from './isPromiseLike'
import { IDuplex } from '../api/IDuplex'
import { Writable } from 'ts-stream'

export function mapStreamTo<In, Out> (input: IReadable<In>, op: (input: In) => PromiseLike<Out> | Out, output: Writable<Out>) {
  const stream = mapStream(input, op)
  return stream.forEach(
    item => {
      if (!isPromiseLike(item)) {
        return output.write(item)
      }
      return item
        .then(result => output.write(result))
        .then(() => { /* return void */ })
    }
  )
}

export function mapStream<In, Out> (input: IReadable<In>, op: (input: In) => PromiseLike<Out> | Out): IReadable<Out> {
  return {
    abort: (reason?: Error) => input.abort(reason),
    aborted: () => input.aborted(),
    result: () => input.result(),
    forEach (
      reader: (item: Out) => PromiseLike<void> | void,
      ender: (error?: Error) => void,
      aborter: (error: Error) => void
    ) {
      return input.forEach(
        item => {
          const result = op(item)
          if (!isPromiseLike(result)) {
            return reader(result)
          }
          return result.then(reader)
        },
        ender,
        aborter
      )
    }
  }
}
