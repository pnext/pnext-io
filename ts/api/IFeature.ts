import FeatureType from './FeatureType'

export default interface IFeature {
  readonly name: string
  readonly type: FeatureType | FeatureType[]
  readonly length?: number
}
