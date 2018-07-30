import IFeature from '../api/IFeature'
import FeatureType from '../api/FeatureType'

export default function featureMatch (base: IFeature[], target: IFeature[]): (string | null) {
  const availableFeatures: { [k: string]: IFeature } = {}
  for (const feature of base) {
    availableFeatures[feature.name] = feature
  }
  for (let i = 0; i < target.length; i ++) {
    const targetFeature = target[i]
    const rootFeature = availableFeatures[targetFeature.name]
    if (!rootFeature) {
      return `#${i}: ${targetFeature.name} is not available.`
    }
    if (rootFeature.type !== targetFeature.type) {
      return `#${i}: ${targetFeature.name}'s type is incompatible ${rootFeature.type}:${targetFeature.type}`
    }
  }
  return null
}
