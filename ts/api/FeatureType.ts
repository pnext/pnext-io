enum FeatureType {
  int8 = 1,         // fixed size 1 byte number: -127~128
  uint8 = 2,        // fixed size 1 byte number: 0~255

  int16 = 3,        // fixed size 2 byte number: -32768~32768
  uint16 = 4,       // fixed size 2 byte number: 0~255 + (0~255)<<16 => 0~65536

  int32 = 5,        // fixed size 4 byte number: 0~255 + (0~255)<<16 + (0~255)<<24 + (0~256)<<32 -2147483648 => 2147483648~-2147483648
  uint32 = 6,       // fixed size 4 byte number: 0~255 + (0~255)<<16 + (0~255)<<24 + (0~256)<<32 => 0~4294967296

  int64 = 7,        // fixed size 8 byte number: -9223372036854776000~9223372036854776000
  uint64 = 8,       // fixed size 8 byte number: 0~18446744073709552000

  bytes = 9,        // variable size bytes: uint32-size-number + amount of bytes
  string = 10,      // variable size string: utf-8 encoded bytes

  bool = 11,        // 0 = false, 1~7 = true

  float = 12,       // fixed size 4 byte floating point
  double = 13       // fixed size 8 byte floating point
}

/* Number Space of positive integers that fit in common color spaces */
export const UInt16: FeatureType[] = [ FeatureType.uint8, FeatureType.uint16 ]
/* Number Space of positive integers that fit in JavaScripts "Number" space */
export const UInt32: FeatureType[] = UInt16.concat([ FeatureType.uint32 ])
/* Number Space of positive and negative integers that fit in JavaScripts "Number" space */
export const Int32: FeatureType[] = [ FeatureType.int8, FeatureType.int16, FeatureType.int32 ].concat(UInt32)
/* Number Space of positive integers that might require "Long" numbers */
export const UInt64: FeatureType[] = UInt32.concat([ FeatureType.uint64 ])
/* Number Space of positive and negative integers that might require "Long" numbers */
export const Int64: FeatureType[] = Int32.concat([ FeatureType.int64, FeatureType.uint64 ])
/* Number Space of floating point numbers that fit in the Number space */
export const Double: FeatureType[] = [ FeatureType.float, FeatureType.double ].concat(Int32)
/* Number Space of floating point numbers that might require "Long" numbers */
export const LongDouble: FeatureType[] = Double.concat([ FeatureType.int64, FeatureType.uint64 ])

export default FeatureType

export function parseFeatureString (type: string): FeatureType {
  switch (type) {
    case 'int8': return FeatureType.int8
    case 'uint8': return FeatureType.uint8
    case 'int16': return FeatureType.int16
    case 'uint16': return FeatureType.uint16
    case 'int32': return FeatureType.int32
    case 'uint32': return FeatureType.uint32
    case 'int64': return FeatureType.int64
    case 'uint64': return FeatureType.uint64
    case 'bytes': return FeatureType.bytes
    case 'string': return FeatureType.string
    case 'bool': return FeatureType.bool
    case 'float': return FeatureType.float
    case 'double': return FeatureType.double
  }
  throw new Error(`Unknown feature type ${type}`)
}
