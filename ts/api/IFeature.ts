import FeatureType from './FeatureType'

export default interface IFeature {
  readonly name: string
  readonly type: FeatureType
  readonly length?: number
}
