import FeatureType, { Double, UInt16, UInt32, UInt64 } from './FeatureType'
import IFeature from './IFeature'

const typesAsArray: IFeature[] = [
  { name: 'x', type: Double },
  { name: 'y', type: Double },
  { name: 'z', type: Double },
  { name: 'classification', type: UInt32 },
  { name: 'synthetic', type: FeatureType.bool },
  { name: 'keyPoint', type: FeatureType.bool },
  { name: 'withheld', type: FeatureType.bool },
  { name: 'overlap', type: FeatureType.bool },
  { name: 'r', type: UInt16 },
  { name: 'g', type: UInt16 },
  { name: 'b', type: UInt16 },
  { name: 'a', type: UInt16 },
  { name: 'returnNumber', type: UInt32 },
  { name: 'numberOfReturns', type: UInt16 },
  { name: 'edge', type: FeatureType.bool },
  { name: 'nir', type: Double },
  { name: 'xt', type: Double },
  { name: 'yt', type: Double },
  { name: 'zt', type: Double },
  { name: 'scanAngle', type: Double },
  { name: 'scannerChannel', type: UInt16 },
  { name: 'direction', type: FeatureType.bool },
  { name: 'time', type: UInt64 },
  { name: 'returnPointLocation', type: Double }
]

export default typesAsArray.reduce((types: { [key: string]: IFeature }, type) => {
  types[type.name] = type
  return types
}, {})
