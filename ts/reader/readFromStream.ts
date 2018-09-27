import { IReadable } from '../api/IReadable'
import IReader from './IReader'
import { createWorkContext } from './util/createWorkContext'
import { OutgoingHttpHeaders } from 'http'
import { combine } from './util/combine'
import { isPromiseLike } from '../util/isPromiseLike'
import IDynamicContext from './util/IDynamicContext'
import { Writable } from 'ts-stream'
import { isIterable } from '../util/isIterable'

export type ParseReader<Out> = IReader<Out> | Iterable<IReader<Out>>

function parseAll<Out> (
  input: IReadable<Uint8Array>,
  parseReader: ParseReader<Out>,
  readItem: (item: Out) => PromiseLike<void> | void,
  ender: (error?: Error) => void,
  aborter: (error: Error) => void
) {
  const iterator = isIterable(parseReader)
    ? parseReader[Symbol.iterator]()
    : { next: () => ({ done: false, value: parseReader }) }
  const context = createWorkContext()
  let leftOver: Uint8Array = null
  let readerTuple = iterator.next()
  return input.forEach(
    data => {
      if (readerTuple.done) {
        // Further data will be ignored
        return
      }
      context.byteOffset = 0
      if (leftOver !== null) {
        data = combine([leftOver, data])
      }
      if (data.byteLength >= readerTuple.value.minSize) {
        const view = new DataView(data.buffer)
        if (readerTuple.value.readDynamic(view, context)) {
          if (data.byteLength === context.size) {
            leftOver = null
          } else {
            leftOver = data.slice(context.size)
          }
          readerTuple = iterator.next(context)
          return readItem(context.data)
        }
      }
      leftOver = data
    },
    (error?: Error) => {
      if (!error && leftOver !== null && !readerTuple.done) {
        error = new Error(`There is some left-over data in the stream!`)
      }
      ender(error)
    },
    aborter
  )
}

export function readFromStreamTo<Out> (input: IReadable<Uint8Array>, parseReader: ParseReader<Out>, byos: Writable<Out>) {
  return parseAll(
    input,
    parseReader,
    item => byos.write(item),
    (error?: Error) => error && byos.end(error),
    (error: Error) => byos.abort(error)
  )
}

export function readFromStream<Out> (input: IReadable<Uint8Array>, parseReader: ParseReader<Out>): IReadable<Out> {
  return {
    abort: (reason?: Error) => input.abort(reason),
    aborted: () => input.aborted(),
    result: () => input.result(),
    forEach (
      readItem: (item: Out) => PromiseLike<void> | void,
      ender: (error?: Error) => void,
      aborter: (error: Error) => void
    ) {
      return parseAll(input, parseReader, readItem, ender, aborter)
    }
  }
}
