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
  aborter: (error: Error) => void,
  ctx: IRunContext
) {
  const iterator = isIterable(parseReader)
    ? parseReader[Symbol.iterator]()
    : { next: () => ({ done: false, value: parseReader }) }
  const context = createWorkContext()
  let leftOver: Uint8Array = null
  let readerTuple = iterator.next()
  let count = 0
  let byteLeft
  return input.forEach(
    data => {
      if (ctx.isAborted) {
        return
      }
      if (readerTuple.done) {
        // Further data will be ignored
        return
      }
      context.byteOffset = 0
      if (leftOver !== null) {
        data = combine([leftOver, data])
      }
      const view = new DataView(data.buffer, data.byteOffset)
      byteLeft = data.byteLength
      let maybeNext = false
      while (!readerTuple.done && byteLeft >= readerTuple.value.minSize && !ctx.isAborted && !maybeNext) {
        if (!readerTuple.value.readDynamic(view, context)) {
          maybeNext = true
          break
        }
        readItem(context.data)
        byteLeft -= context.size
        count ++
        readerTuple = iterator.next(context)
      }
      if (byteLeft === 0) {
        leftOver = null
      } else {
        leftOver = data.slice(context.byteOffset)
      }
    },
    (error?: Error) => {
      if (!error && !ctx.isAborted && leftOver !== null && !readerTuple.done) {
        error = new Error(`There is some left-over data in the stream! ${leftOver.byteLength} bytes left ${byteLeft}.`)
      }
      return ender(error)
    },
    aborter
  )
}

interface IRunContext {
  isAborted: boolean
}

export function readFromStreamTo<Out> (input: IReadable<Uint8Array>, parseReader: ParseReader<Out>, byos: Writable<Out>, ctx: IRunContext) {
  return parseAll(
    input,
    parseReader,
    item => byos.write(item),
    (error?: Error) => error && byos.end(error),
    (error: Error) => byos.abort(error),
    ctx
  )
}

export function readFromStream<Out> (input: IReadable<Uint8Array>, parseReader: ParseReader<Out>): IReadable<Out> {
  const ctx = {
    isAborted: false
  }
  return {
    abort: (reason?: Error) => {
      ctx.isAborted = true
      return input.abort(reason)
    },
    aborted: () => input.aborted(),
    result: () => input.result(),
    forEach (
      readItem: (item: Out) => PromiseLike<void> | void,
      ender: (error?: Error) => void,
      aborter: (error: Error) => void
    ) {
      return parseAll(input, parseReader, readItem, ender, aborter, ctx)
    }
  }
}
