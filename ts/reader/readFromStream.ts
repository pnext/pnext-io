import { IReadable } from '../api/IReadable'
import IReader from './IReader'
import { createWorkContext } from './util/createWorkContext'
import { OutgoingHttpHeaders } from 'http'
import { combine } from './util/combine'
import { isPromiseLike } from '../util/isPromiseLike'
import IDynamicContext from './util/IDynamicContext'
import { Writable } from 'ts-stream'

type NextReader<Out> = ((context: IDynamicContext) => IReader<Out> | null | undefined)
export type ParseReader<Out> = IReader<Out> | NextReader<Out>

function parseAll<Out> (
  input: IReadable<Uint8Array>,
  parseReader: ParseReader<Out>,
  readItem: (item: Out) => PromiseLike<void> | void,
  ender: (error?: Error) => void,
  aborter: (error: Error) => void
) {
  let nextReader: NextReader<Out>
  if (typeof parseReader === 'function') {
    nextReader = parseReader
  } else {
    nextReader = () => parseReader
  }
  const context = createWorkContext()
  let leftOver: Uint8Array = null
  let reader = nextReader(context)
  return input.forEach(
    data => {
      if (reader === null || reader === undefined) {
        // Further data will be ignored
        return
      }
      context.byteOffset = 0
      if (leftOver !== null) {
        data = combine([leftOver, data])
      }
      if (data.byteLength >= reader.minSize) {
        const view = new DataView(data.buffer)
        if (reader.readDynamic(view, context)) {
          if (data.byteLength === context.size) {
            leftOver = null
          } else {
            leftOver = data.slice(context.size)
          }
          reader = nextReader(context)
          return readItem(context.data)
        }
      }
      leftOver = data
    },
    (error?: Error) => {
      if (!error && leftOver !== null && reader) {
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
