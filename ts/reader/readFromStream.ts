import Stream, { ReadableStream } from 'ts-stream'
import IReader from './IReader'
import { mapSeries } from 'bluebird'
import IDynamicContext from './IDynamicContext'

function combine (a: Uint8Array, b: Uint8Array) {
  const combined = new Uint8Array(a.length + b.length)
  combined.set(a, 0)
  combined.set(b, a.length)
  return combined
}

function readFixedSize (out: Stream<any>, inStream: ReadableStream<Uint8Array>, reader: IReader) {
  let leftOver = null
  return inStream.forEach((data: Uint8Array) => {
    let end = reader.minSize
    let start = 0
    if (leftOver !== null) {
      data = combine(leftOver, data)
    }
    let entries: any[]
    while (end <= data.length) {
      if (entries === undefined) {
        entries = []
      }
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

function readDynamicSize (out: Stream<any>, inStream: ReadableStream<Uint8Array>, reader: IReader) {
  let leftOver = null
  const context = {
    byteOffset: 0
  }
  return inStream.forEach((data: Uint8Array) => {
    let end = reader.minSize
    workContext.byteOffset = 0
    if (leftOver !== null) {
      data = combine(leftOver, data)
    }
    let entries: any[]
    while (end <= data.length) {
      if (entries === undefined) {
        entries = []
      }
      if (!reader.readDynamic(new DataView(data.buffer), workContext)) {
        break
      }
      entries.push(workContext.data)
      end = workContext.byteOffset + workContext.size + reader.minSize
    }
    if (end === data.length) {
      leftOver = null
    } else {
      leftOver = data.subarray(workContext.byteOffset)
    }
    if (entries === undefined) {
      return
    }
    return mapSeries(entries, entry => out.write(entry))
  }).then(() => leftOver)
}

export default function readFromStream (inStream: ReadableStream<Uint8Array>, reader: IReader): ReadableStream<any> {
  const out = new Stream<any>()
  let process = reader.fixedSize
    ? readFixedSize(out, inStream, reader)
    : readDynamicSize(out, inStream, reader)

  process
    .then((leftOver) => out.end(null, leftOver))
    .catch((reason: Error) => out.end(reason))
  return out
}
