import IFeature from './IFeature'
import FeatureType from './FeatureType'

const { double, uint8 } = FeatureType

const Feature: { [k: string]: IFeature } = {
  x: { name: 'x', type: double },
  y: { name: 'y', type: double },
  z: { name: 'z', type: double },
  r: { name: 'r', type: uint8 },
  g: { name: 'g', type: uint8 },
  b: { name: 'b', type: uint8 },
  a: { name: 'a', type: uint8 },
}

export default Feature

