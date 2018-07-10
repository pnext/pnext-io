import FeatureType from "../api/FeatureType"

const FeatureLength: { [k: number]: number } = {
  [FeatureType.uint8]: 1,
  [FeatureType.uint16]: 2,
  [FeatureType.uint32]: 4,
  [FeatureType.uint64]: 8,
  [FeatureType.int8]: 1,
  [FeatureType.int16]: 2,
  [FeatureType.int32]: 4,
  [FeatureType.int64]: 8,
  [FeatureType.sint8]: 1,
  [FeatureType.sint16]: 2,
  [FeatureType.sint32]: 3,
  [FeatureType.sint64]: 4,
  [FeatureType.fixedint8]: 1,
  [FeatureType.fixedint16]: 2,
  [FeatureType.fixedint32]: 4,
  [FeatureType.fixedint64]: 8,
  [FeatureType.sfixedint8]: 1,
  [FeatureType.sfixedint16]: 2,
  [FeatureType.sfixedint32]: 4,
  [FeatureType.sfixedint64]: 8,
  [FeatureType.bool]: 1,
  [FeatureType.float]: 4,
  [FeatureType.double]: 8
}

export default FeatureLength
