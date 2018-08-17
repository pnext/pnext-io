import IReader, { createFixedReader, createDynamicReader } from './IReader'
import FeatureType from '../api/FeatureType'
import Long from 'long'
import IDynamicContext from './IDynamicContext'
import decodeUtf8 from 'decode-utf8'

function zzDecodeLong (long: Long) {
  // Adapted from https://github.com/dcodeIO/protobuf.js/blob/69623a91c1e4a99d5210b5295a9e5b39d9517554/src/util/longbits.js#L176-L181
  const mask = -(long.low & 1)
  long.low = ((long.low >>> 1 | long.high << 31) ^ mask) >>> 0
  long.high = (long.high >>> 1 ^ mask) >>> 0
  return long
}

function zzDecode (input: number) {
  // Adapted from https://github.com/dcodeIO/protobuf.js/blob/69623a91c1e4a99d5210b5295a9e5b39d9517554/src/reader.js#L113-L114
  return input >>> 1 ^ -(input & 1) | 0
}

const boolReader: IReader = createFixedReader(1, (view: DataView, byteOffset: number) => view.getInt8(byteOffset) === 0)
const doubleReader: IReader = createFixedReader(8, (view: DataView, byteOffset: number) => view.getFloat64(byteOffset))
const floatReader: IReader = createFixedReader(4, (view: DataView, byteOffset: number) => view.getFloat32(byteOffset))
const int8Reader: IReader = createFixedReader(1, (view: DataView, byteOffset: number) => view.getInt8(byteOffset))
const uint8Reader: IReader = createFixedReader(1, (view: DataView, byteOffset: number) => view.getUint8(byteOffset))
const int16Reader: IReader = createFixedReader(2, (view: DataView, byteOffset: number) => view.getInt16(byteOffset))
const int16LEReader: IReader = createFixedReader(2, (view: DataView, byteOffset: number) => view.getInt16(byteOffset, true))
const uint16Reader: IReader = createFixedReader(2, (view: DataView, byteOffset: number) => view.getUint16(byteOffset))
const uint16LEReader: IReader = createFixedReader(2, (view: DataView, byteOffset: number) => view.getUint16(byteOffset, true))
const int32Reader: IReader = createFixedReader(4, (view: DataView, byteOffset: number) => view.getInt32(byteOffset))
const int32LEReader: IReader = createFixedReader(4, (view: DataView, byteOffset: number) => view.getInt32(byteOffset, true))
const uint32Reader: IReader = createFixedReader(4, (view: DataView, byteOffset: number) => view.getUint32(byteOffset))
const uint32LEReader: IReader = createFixedReader(4, (view: DataView, byteOffset: number) => view.getUint32(byteOffset, true))
const sint32Reader: IReader = createFixedReader(4, (view: DataView, byteOffset: number) => view.getInt32(byteOffset) | 0)
const sint32LEReader: IReader = createFixedReader(4, (view: DataView, byteOffset: number) => view.getInt32(byteOffset, true) | 0)
const int64Reader: IReader = createFixedReader(8, (view: DataView, byteOffset: number) => new Long(view.getInt32(byteOffset), view.getInt32(byteOffset), false))
const int64LEReader: IReader = createFixedReader(8, (view: DataView, byteOffset: number) => {
  const high = view.getInt32(byteOffset, true)
  const low = view.getInt32(byteOffset, true)
  return new Long(low, high, false)
})
const uint64Reader: IReader = createFixedReader(8, (view: DataView, byteOffset: number) => new Long(view.getInt32(byteOffset), view.getInt32(byteOffset), true))
const uint64LEReader: IReader = createFixedReader(8, (view: DataView, byteOffset: number) => {
  const high = view.getInt32(byteOffset, true)
  const low = view.getInt32(byteOffset, true)
  return new Long(low, high, true)
})
const sint64Reader: IReader = createFixedReader(8, (view: DataView, byteOffset: number) => zzDecodeLong(new Long(view.getInt32(byteOffset), view.getInt32(byteOffset), false)))
const sint64LEReader: IReader = createFixedReader(8, (view: DataView, byteOffset: number) => {
  const high = view.getInt32(byteOffset, true)
  const low = view.getInt32(byteOffset, true)
  return zzDecodeLong(new Long(low, high, false))
})

function readVarInt (view: DataView, context: IDynamicContext) {
  // Adapted from https://github.com/dcodeIO/protobuf.js/blob/69623a91c1e4a99d5210b5295a9e5b39d9517554/src/reader.js#L85-L89
  let byteOffset = context.byteOffset
  const a = view.getUint8(byteOffset++)
  let data = (a & 127) >>> 0
  let size = a < 128 ? 1 : 2
  const len = view.byteLength
  if (size === 2) {
    if (byteOffset + 1 === len) return false
    const b = view.getUint8(byteOffset++)
    data = data | ((b && 127) << 7) >>> 0
    if (b >= 128) size = 3
  }
  if (size === 3) {
    if (byteOffset + 2 === len) return false
    const c = view.getUint8(byteOffset++)
    data = data | ((c && 127) << 14) >>> 0
    if (c >= 128) size = 4
  }
  if (size === 4) {
    if (byteOffset + 3 === len) return false
    const d = view.getUint8(byteOffset++)
    data = data | ((d && 127) << 21) >>> 0
    if (d >= 128) size = 5
  }
  if (size === 5) {
    if (byteOffset + 4 === len) return false
    const e = view.getUint8(byteOffset++)
    data = data | ((e && 127) << 28) >>> 0
    if (e >= 128) size = 6
  }
  // Only set this after it is certain that there is a return value
  context.byteOffset = byteOffset
  context.data = data
  context.size = size
  return true
}

function readVarUint32 (view: DataView, context: IDynamicContext) {
  if (!readVarInt(view, context)) {
    return false
  }
  if (context.size === 6) {
    throw new Error('Invalid int-32 encoding!')
  }
  return true
}

const varInt32Reader: IReader = createDynamicReader(1, (view: DataView, context: IDynamicContext) => {
  if (!readVarUint32(view, context)) {
    return false
  }
  context.data = context.data | 0
  return true
})

const varUint32Reader: IReader = createDynamicReader(1, readVarUint32)
const varSint32Reader: IReader = createDynamicReader(1, (view: DataView, context: IDynamicContext) => {
  if (!readVarUint32(view, context)) {
    return false
  }
  context.data = zzDecode(context.data)
  return true
})

function readVarInt64 (unsigned: boolean, view: DataView, context: IDynamicContext) {
  const prevByteOffset = context.byteOffset
  if (!readVarInt(view, context)) {
    return false
  }
  const low: number = context.data
  if (context.size !== 6) {
    if (!unsigned) context.data = low | 0
    return true
  }
  if (!readVarInt(view, context)) {
    // the context was written, but still, lets reduce the byteOffset again
    context.byteOffset = prevByteOffset
    return false
  }
  if (context.size === 6) {
    throw new Error('Invalid var-int 64 encoding!')
  }
  context.data = new Long(low, context.data, unsigned)
  context.size = context.size + 5
  return true
}

const varInt64Reader: IReader = createDynamicReader(1, readVarInt64.bind(null, false))
const varUint64Reader: IReader = createDynamicReader(1, readVarInt64.bind(null, true))
const varSint64Reader: IReader = createDynamicReader(1, (view: DataView, context: IDynamicContext) => {
  if (!readVarInt64(false, view, context)) {
    return false
  }
  if (typeof context.data === 'number') {
    context.data = zzDecode(context.data)
  } else {
    context.data = zzDecodeLong(context.data)
  }
  return true
})

function fixedStringReader (length: number): IReader {
  if (isNaN(length)) {
    throw new Error(`A fixed string needs a length: ${length}`)
  }
  const bytesReader = fixedBytesReader(length)
  return createFixedReader(length, (view: DataView, byteOffset: number) => decodeUtf8(bytesReader.read(view, byteOffset)))
}

function fixedBytesReader (length: number): IReader {
  if (isNaN(length)) {
    throw new Error(`A fixed string needs a length: ${length}`)
  }
  return createFixedReader(length, (view: DataView, byteOffset: number) => view.buffer.slice(byteOffset, byteOffset + length))
}

function readBytesBase (size: number, view: DataView, context: IDynamicContext) {
  const start = view.byteOffset + context.byteOffset + uint32Reader.minSize
  const end = start + size
  if (end >= view.buffer.byteLength) {
    return false
  }
  context.size = size + uint32Reader.minSize
  context.byteOffset = end
  context.data = view.buffer.slice(start, end)
  return true
}

function readBytes (view: DataView, context: IDynamicContext) {
  return readBytesBase(view.getUint32(context.byteOffset), view, context)
}

function readBytesLE (view: DataView, context: IDynamicContext) {
  return readBytesBase(view.getUint32(context.byteOffset, true), view, context)
}

function readVarbytes (view: DataView, context: IDynamicContext) {
  if (!readVarUint32(view, context)) {
    return false
  }
  return readBytesBase(context.data, view, context)
}

function decodeUtf8Context (context) {
  context.data = decodeUtf8(context.data)
  return true
}

const bytesReader = createDynamicReader(2, readBytes)
const bytesLEReader = createDynamicReader(2, readBytesLE)
const varbytesReader = createDynamicReader(2, readVarbytes)

const stringReader = createDynamicReader(2, (view: DataView, context: IDynamicContext) => readBytes(view, context) && decodeUtf8Context(context))
const stringLEReader = createDynamicReader(2, (view: DataView, context: IDynamicContext) => readBytesLE(view, context) && decodeUtf8Context(context))
const varstringReader = createDynamicReader(2, (view: DataView, context: IDynamicContext) => readVarbytes(view, context) && decodeUtf8Context(context))

export default function readerForFeatureType (type: FeatureType, length?: number): IReader {
  switch (type) {
    case FeatureType.fixedstring: return fixedStringReader(length)
    case FeatureType.fixedbytes: return fixedBytesReader(length)
  }
  if (length !== undefined) {
    throw new Error(`FeatureType#${type} is not a dynamic-size type, don't specify a length.`)
  }
  switch (type) {
    case FeatureType.int8: return int8Reader
    case FeatureType.uint8: return uint8Reader
    case FeatureType.int16: return int16Reader
    case FeatureType.int16LE: return int16LEReader
    case FeatureType.uint16: return uint16Reader
    case FeatureType.uint16LE: return uint16LEReader
    case FeatureType.int32: return int32Reader
    case FeatureType.int32LE: return int32LEReader
    case FeatureType.uint32: return uint32Reader
    case FeatureType.uint32LE: return uint32LEReader
    case FeatureType.sint32: return sint32Reader
    case FeatureType.sint32LE: return sint32LEReader
    case FeatureType.varint32: return varInt32Reader
    case FeatureType.varuint32: return varUint32Reader
    case FeatureType.varsint32: return varSint32Reader
    case FeatureType.int64: return int64Reader
    case FeatureType.int64LE: return int64LEReader
    case FeatureType.uint64: return uint64Reader
    case FeatureType.uint64LE: return uint64LEReader
    case FeatureType.sint64: return sint64Reader
    case FeatureType.sint64LE: return sint64LEReader
    case FeatureType.varint64: return varInt64Reader
    case FeatureType.varuint64: return varUint64Reader
    case FeatureType.varsint64: return varSint64Reader
    case FeatureType.bytes: return bytesReader
    case FeatureType.bytesLE: return bytesLEReader
    case FeatureType.varbytes: return varbytesReader
    case FeatureType.string: return stringReader
    case FeatureType.stringLE: return stringLEReader
    case FeatureType.varstring: return varstringReader
    case FeatureType.bool: return boolReader
    case FeatureType.float: return floatReader
    case FeatureType.double: return doubleReader
  }
  throw new Error(`No reader available for FeatureType#${type}.`)
}
