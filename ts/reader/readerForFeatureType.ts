import IReader from './IReader'
import FeatureType from '../api/FeatureType'
import fixedString from './type/fixedString'
import fixedBytes from './type/fixedBytes'
import int8 from './type/int8'
import uint8 from './type/uint8'
import int16 from './type/int16'
import int16LE from './type/int16LE'
import uint16 from './type/uint16'
import uint16LE from './type/uint16LE'
import int32 from './type/int32'
import int32LE from './type/int32LE'
import uint32 from './type/uint32'
import uint32LE from './type/uint32LE'
import sint32 from './type/sint32'
import sint32LE from './type/sint32LE'
import varint32 from './type/varint32'
import varuint32 from './type/varuint32'
import varsint32 from './type/varsint32'
import int64 from './type/int64'
import int64LE from './type/int64LE'
import uint64 from './type/uint64'
import uint64LE from './type/uint64LE'
import sint64 from './type/sint64'
import sint64LE from './type/sint64LE'
import varint64 from './type/varint64'
import varuint64 from './type/varuint64'
import varsint64 from './type/varsint64'
import bytes from './type/bytes'
import bytesLE from './type/bytesLE'
import varbytes from './type/varbytes'
import string from './type/string'
import stringLE from './type/stringLE'
import varstring from './type/varstring'
import bool from './type/bool'
import float from './type/float'
import double from './type/double'

export default function readerForFeatureType (type: FeatureType, length?: number): IReader {
  switch (type) {
    case FeatureType.fixedstring: return fixedString(length)
    case FeatureType.fixedbytes: return fixedBytes(length)
  }
  if (length !== undefined) {
    throw new Error(`FeatureType#${type} is not a dynamic-size type, don't specify a length.`)
  }
  switch (type) {
    case FeatureType.int8: return int8
    case FeatureType.uint8: return uint8
    case FeatureType.int16: return int16
    case FeatureType.int16LE: return int16LE
    case FeatureType.uint16: return uint16
    case FeatureType.uint16LE: return uint16LE
    case FeatureType.int32: return int32
    case FeatureType.int32LE: return int32LE
    case FeatureType.uint32: return uint32
    case FeatureType.uint32LE: return uint32LE
    case FeatureType.sint32: return sint32
    case FeatureType.sint32LE: return sint32LE
    case FeatureType.varint32: return varint32
    case FeatureType.varuint32: return varuint32
    case FeatureType.varsint32: return varsint32
    case FeatureType.int64: return int64
    case FeatureType.int64LE: return int64LE
    case FeatureType.uint64: return uint64
    case FeatureType.uint64LE: return uint64LE
    case FeatureType.sint64: return sint64
    case FeatureType.sint64LE: return sint64LE
    case FeatureType.varint64: return varint64
    case FeatureType.varuint64: return varuint64
    case FeatureType.varsint64: return varsint64
    case FeatureType.bytes: return bytes
    case FeatureType.bytesLE: return bytesLE
    case FeatureType.varbytes: return varbytes
    case FeatureType.string: return string
    case FeatureType.stringLE: return stringLE
    case FeatureType.varstring: return varstring
    case FeatureType.bool: return bool
    case FeatureType.float: return float
    case FeatureType.double: return double
  }
  throw new Error(`No reader available for FeatureType#${type}.`)
}
