import Stream, { ReadableStream } from 'ts-stream'
import IReader from './IReader'
import { mapSeries } from 'bluebird'
import IDynamicContext from './util/IDynamicContext'

function combine (a: Uint8Array, b: Uint8Array) {
  const combined = new Uint8Array(a.length + b.length)
  combined.set(a, 0)
  combined.set(b, a.length)
  return combined
}

function readFixedSize (out: Stream<any>, inStream: ReadableStream<Uint8Array>, reader: IReader, limit: number = undefined) {
  let leftOver = null
  let count = 0
  return inStream.forEach((data: Uint8Array) => {
    let end = reader.minSize
    let start = 0
    if (leftOver !== null) {
      data = combine(leftOver, data)
    }
    let entries: any[]
    while (end <= data.length && (limit === undefined || count < limit)) {
      if (entries === undefined) {
        entries = []
      }
      count += 1
      entries.push(reader.read(new DataView(data.buffer), start))
      start = end
      end += reader.minSize
    }
    if (end === data.length) {
      leftOver = null
    } else {
      leftOver = data.subarray(start)
    }
    if (entries === undefined) {
      return
    }
    return mapSeries(entries, entry => out.write(entry))
  }).then(() => leftOver)
}

const workContext: IDynamicContext = {
  byteOffset: 0,
  size: 0,
  data: null
}

function readDynamicSize (out: Stream<any>, inStream: ReadableStream<Uint8Array>, reader: IReader, limit: number = undefined) {
  let leftOver = null
  const context = {
    byteOffset: 0
  }
  let count = 0
  return inStream.forEach((data: Uint8Array) => {
    workContext.byteOffset = 0
    if (leftOver !== null) {
      data = combine(leftOver, data)
    }
    let entries: any[]
    if (data.byteLength >= reader.minSize) {
      let nextMinSize = 0
      const view = new DataView(data.buffer)
      while (nextMinSize <= view.byteLength && (limit === undefined || count < limit)) {
        if (entries === undefined) {
          entries = []
        }
        if (!reader.readDynamic(view, workContext)) {
          break
        }
        count += 1
        entries.push(workContext.data)
        nextMinSize = workContext.byteOffset + workContext.size + reader.minSize
      }
      if (nextMinSize === data.length) {
        leftOver = null
      } else {
        leftOver = data.subarray(workContext.byteOffset)
      }
    } else {
      leftOver = data
    }
    if (entries === undefined) {
      return
    }
    return mapSeries(entries, entry => out.write(entry))
  }).then(() => leftOver)
}

export default function readFromStream (inStream: ReadableStream<Uint8Array>, reader: IReader, limit: number = undefined): ReadableStream<any> {
  const out = new Stream<any>()
  let process = reader.fixedSize
    ? readFixedSize(out, inStream, reader, limit)
    : readDynamicSize(out, inStream, reader, limit)

  process
    .then((leftOver) => out.end(null, leftOver))
    .catch((reason: Error) => out.end(reason))
  return out
}
