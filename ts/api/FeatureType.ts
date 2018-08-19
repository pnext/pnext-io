enum FeatureType {
  uint8 = 1,
  uint16 = 2,
  uint32 = 3,
  uint64 = 4,
  int8 = 5,
  int16 = 6,
  int32 = 7,
  int64 = 8,
  sint8 = 9,
  sint16 = 10,
  sint32 = 11,
  sint64 = 12,
  fixedint8 = 13,
  fixedint16 = 14,
  fixedint32 = 15,
  fixedint64 = 16,
  sfixedint8 = 17,
  sfixedint16 = 18,
  sfixedint32 = 19,
  sfixedint64 = 20,
  string = 21,
  bytes = 22,
  bool = 23,
  float = 24,
  double = 25,
  varstring = 26,
  varbytes = 27
}

export default FeatureType

export function parseFeatureString (type: string): FeatureType {
  switch (type) {
    case 'bool': return FeatureType.bool
    case 'bytes': return FeatureType.bytes
    case 'double': return FeatureType.double
    case 'fixedint16': return FeatureType.fixedint16
    case 'fixedint32': return FeatureType.fixedint32
    case 'fixedint64': return FeatureType.fixedint64
    case 'fixedint8': return FeatureType.fixedint8
    case 'float': return FeatureType.float
    case 'int16': return FeatureType.int16
    case 'int32': return FeatureType.int32
    case 'int64': return FeatureType.int64
    case 'int8': return FeatureType.int8
    case 'sfixedint16': return FeatureType.sfixedint16
    case 'sfixedint32': return FeatureType.sfixedint32
    case 'sfixedint64': return FeatureType.sfixedint64
    case 'sfixedint8': return FeatureType.sfixedint8
    case 'sint16': return FeatureType.sint16
    case 'sint32': return FeatureType.sint32
    case 'sint64': return FeatureType.sint64
    case 'sint8': return FeatureType.sint8
    case 'string': return FeatureType.string
    case 'uint16': return FeatureType.uint16
    case 'uint32': return FeatureType.uint32
    case 'uint64': return FeatureType.uint64
    case 'uint8': return FeatureType.uint8
    case 'varbytes': return FeatureType.varbytes
    case 'varstring': return FeatureType.varstring
  }
  throw new Error(`Unknown feature type ${type}`)
}
