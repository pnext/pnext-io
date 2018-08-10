enum FeatureType {
  int8 = 1,         // fixed size 1 byte number: -127~128
  uint8 = 2,        // fixed size 1 byte number: 0~255

  int16 = 3,        // fixed size 2 byte number: -32768~32768
  uint16 = 4,       // fixed size 2 byte number: 0~255 + (0~255)<<16 => 0~65536

  int32 = 4,        // fixed size 4 byte number: 0~255 + (0~255)<<16 + (0~255)<<24 + (0~256)<<32 -2147483648 => 2147483648~-2147483648
  uint32 = 5,       // fixed size 4 byte number: 0~255 + (0~255)<<16 + (0~255)<<24 + (0~256)<<32 => 0~4294967296
  sint32 = 6,       // fixed size 4 byte, reverse stored number: -2147483648~2147483648
  varint32 = 7,     // variable size 1~5 byte number: [0~127 + (1bit] + [(0~127)<<7) + (1bit] + (0~127)<<14) + (1bit] + [0~127) + (1bit] + 0~15) => 2147483648~-2147483648
  varuint32 = 8,    // variable size 1~5 byte number: (same like varint) 0~4294967296
  varsint32 = 9,    // variable size 1~5 byte, reverse stored number: -2147483648~2147483648

  int64 = 10,       // fixed size 8 byte number: -9223372036854776000~9223372036854776000
  uint64 = 11,      // fixed size 8 byte number: 0~18446744073709552000
  sint64 = 12,      // fixed size 8 byte, reverse stored number: 9223372036854776000~-9223372036854776000
  varint64 = 13,    // variable size 1~9 byte number: [0~127 + (1bit] + [(0~127)<<7) + (1bit] + (0~127)<<14) + (1bit] + [0~127) + (1bit] + 0~15)... => 9223372036854776000~-9223372036854776000
  varuint64 = 14,   // variable size 1~9 byte number: (same like varint) 0~18446744073709552000
  varsint64 = 15,   // variable size 1~9 byte, reverse stored number: -9223372036854776000~9223372036854776000

  bytes = 16,       // variable size bytes: uint32-size-number + amount of bytes
  string = 17,      // variable size string: utf-8 encoded bytes

  bool = 18,        // 0 = false, 1~7 = true

  float = 19,       // fixed size 4 byte floating point
  double = 21,      // fixed size 8 byte floating point

  fixedstring = 22, // fixed amount of string
  fixedbytes = 23   // fixed amount of bytes
}

export default FeatureType

export function parseFeatureString (type: string): FeatureType {
  switch (type) {
    case 'int8': return FeatureType.int8
    case 'uint8': return FeatureType.uint8
    case 'int16': return FeatureType.int16
    case 'uint16': return FeatureType.uint16
    case 'int32': return FeatureType.int32
    case 'uint32': return FeatureType.uint32
    case 'sint32': return FeatureType.sint32
    case 'varint32': return FeatureType.varint32
    case 'varuint32': return FeatureType.varuint32
    case 'varsint32': return FeatureType.varsint32
    case 'int64': return FeatureType.int64
    case 'uint64': return FeatureType.uint64
    case 'sint64': return FeatureType.sint64
    case 'varint64': return FeatureType.varint64
    case 'varuint64': return FeatureType.varuint64
    case 'varsint64': return FeatureType.varsint64
    case 'bytes': return FeatureType.bytes
    case 'string': return FeatureType.string
    case 'bool': return FeatureType.bool
    case 'float': return FeatureType.float
    case 'double': return FeatureType.double
    case 'fixedstring': return FeatureType.fixedstring
    case 'fixedbytes': return FeatureType.fixedbytes
  }
  throw new Error(`Unknown feature type ${type}`)
}
