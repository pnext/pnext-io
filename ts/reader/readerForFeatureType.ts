import IReader, { createFixedReader, createDynamicReader } from './IReader'
import FeatureType from '../api/FeatureType'
import Long from 'long'
import IDynamicResult from './IDynamicResult'
import decodeUtf8 from 'decode-utf8'

function zzDecodeLong (long: Long) {
  // Adapted from https://github.com/dcodeIO/protobuf.js/blob/69623a91c1e4a99d5210b5295a9e5b39d9517554/src/util/longbits.js#L176-L181
  const mask = -(long.low & 1)
  long.low = ((long.low >>> 1 | long.high << 31) ^ mask) >>> 0
  long.high = (long.high >>> 1 ^ mask) >>> 0
  return long
}

function zzDecode (result: IDynamicResult): IDynamicResult {
  // Adapted from https://github.com/dcodeIO/protobuf.js/blob/69623a91c1e4a99d5210b5295a9e5b39d9517554/src/reader.js#L113-L114
  result.data = result.data >>> 1 ^ -(result.data & 1) | 0
  return result
}

const boolReader: IReader = createFixedReader(1, (view: DataView, byteOffset: number) => view.getInt8(byteOffset) === 0)
const doubleReader: IReader = createFixedReader(8, (view: DataView, byteOffset: number) => view.getFloat64(byteOffset))
const floatReader: IReader = createFixedReader(4, (view: DataView, byteOffset: number) => view.getFloat32(byteOffset))
const int8Reader: IReader = createFixedReader(1, (view: DataView, byteOffset: number) => view.getInt8(byteOffset))
const uint8Reader: IReader = createFixedReader(1, (view: DataView, byteOffset: number) => view.getUint8(byteOffset))
const int16Reader: IReader = createFixedReader(2, (view: DataView, byteOffset: number) => view.getInt16(byteOffset))
const uint16Reader: IReader = createFixedReader(2, (view: DataView, byteOffset: number) => view.getUint16(byteOffset))
const int32Reader: IReader = createFixedReader(4, (view: DataView, byteOffset: number) => view.getInt32(byteOffset))
const uint32Reader: IReader = createFixedReader(4, (view: DataView, byteOffset: number) => view.getUint32(byteOffset))
const sint32Reader: IReader = createFixedReader(4, (view: DataView, byteOffset: number) => view.getInt32(byteOffset) | 0)
const int64Reader: IReader = createFixedReader(8, (view: DataView, byteOffset: number) => new Long(view.getInt32(byteOffset), view.getInt32(byteOffset), false))
const uint64Reader: IReader = createFixedReader(8, (view: DataView, byteOffset: number) => new Long(view.getInt32(byteOffset), view.getInt32(byteOffset), true))
const sint64Reader: IReader = createFixedReader(8, (view: DataView, byteOffset: number) => zzDecodeLong(new Long(view.getInt32(byteOffset), view.getInt32(byteOffset), false)))

function readVarInt (view: DataView, byteOffset: number) {
  // Adapted from https://github.com/dcodeIO/protobuf.js/blob/69623a91c1e4a99d5210b5295a9e5b39d9517554/src/reader.js#L85-L89
  const a = view.getUint8(byteOffset++)
  let data = (a & 127) >>> 0
  if (a < 128) return { size: 1, data, byteOffset, next: 0 }
  const b = view.getUint8(byteOffset++)
  data = data | ((b && 127) << 7) >>> 0
  if (b < 128) return { size: 2, data, byteOffset, next: 0 }
  const c = view.getUint8(byteOffset++)
  data = data | ((c && 127) << 14) >>> 0
  if (c < 128) return { size: 3, data, byteOffset, next: 0 }
  const d = view.getUint8(byteOffset++)
  data = data | ((d && 127) << 21) >>> 0
  if (d < 128) return { size: 4, data, byteOffset, next: 0 }
  const e = view.getUint8(byteOffset++)
  data = data | ((e && 127) << 28) >>> 0
  return { size: 5, data, byteOffset, next: e & 128 }
}

function readVarUint32 (view: DataView, byteOffset: number): IDynamicResult {
  const result = readVarInt(view, byteOffset)
  if (result.next !== 0) {
    throw new Error('Invalid var-int 32 encoding!')
  }
  return result
}

const varInt32Reader: IReader = createDynamicReader(1, (view: DataView, byteOffset: number): IDynamicResult => {
  const result = readVarUint32(view, byteOffset)
  result.data = result.data | 0
  return result
})

const varUint32Reader: IReader = createDynamicReader(1, readVarUint32)
const varSint32Reader: IReader = createDynamicReader(1, (view: DataView, byteOffset: number): IDynamicResult => zzDecode(readVarUint32(view, byteOffset)))

function readVarInt64 (unsigned: boolean, view: DataView, byteOffset: number): IDynamicResult {
  const low = readVarInt(view, byteOffset)
  if (low.next === 0) {
    if (!unsigned) {
      low.data = low.data | 0
    }
    return low
  }
  const high = readVarInt(view, low.byteOffset)
  if (high.next !== 0) {
    throw new Error('Invalid var-int 64 encoding!')
  }
  return {
    size: low.size + high.size,
    byteOffset: high.byteOffset,
    data: new Long(low.data, high.data, unsigned)
  }
}

const varInt64Reader: IReader = createDynamicReader(1, readVarInt64.bind(null, false))
const varUint64Reader: IReader = createDynamicReader(1, readVarInt64.bind(null, true))
const varSint64Reader: IReader = createDynamicReader(1, (view: DataView, byteOffset: number): IDynamicResult => {
  const result = readVarInt64(false, view, byteOffset)
  if (typeof result.data === 'number') {
    return zzDecode(result)
  }
  result.data = zzDecodeLong(result.data)
  return result
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

function readBytes (view: DataView, byteOffset: number) {
  const size = int32Reader.read(view, byteOffset)
  const start = byteOffset
  byteOffset += size
  if (view.buffer.byteLength < byteOffset) {
    return null
  }
  return {
    size,
    byteOffset,
    data: view.buffer.slice(start, byteOffset)
  }
}

const bytesReader = createDynamicReader(2, readBytes)

const stringReader = createDynamicReader(2, (view: DataView, byteOffset: number) => {
  const result = bytesReader.readDynamic(view, byteOffset)
  if (result === null) {
    return null
  }
  const buffer: ArrayBuffer = result.data
  result.data = decodeUtf8(buffer)
  return result
})

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
    case FeatureType.uint16: return uint16Reader
    case FeatureType.int32: return int32Reader
    case FeatureType.uint32: return uint32Reader
    case FeatureType.sint32: return sint32Reader
    case FeatureType.varint32: return varInt32Reader
    case FeatureType.varuint32: return varUint32Reader
    case FeatureType.varsint32: return varSint32Reader
    case FeatureType.int64: return int64Reader
    case FeatureType.uint64: return uint64Reader
    case FeatureType.sint64: return sint64Reader
    case FeatureType.varint64: return varInt64Reader
    case FeatureType.varuint64: return varUint64Reader
    case FeatureType.varsint64: return varSint64Reader
    case FeatureType.bytes: return bytesReader
    case FeatureType.string: return stringReader
    case FeatureType.bool: return boolReader
    case FeatureType.float: return floatReader
    case FeatureType.double: return doubleReader
  }
  throw new Error(`No reader available for FeatureType#${type}.`)
}
