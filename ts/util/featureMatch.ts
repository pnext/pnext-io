import IFeature from '../api/IFeature'
import FeatureType from '../api/FeatureType'

export function hasMatch (type: FeatureType, matches: FeatureType | FeatureType[]): boolean {
  return Array.isArray(matches) ? matches.includes(type) : type === matches
}

export function typesMatch (type: FeatureType | FeatureType[], matches: FeatureType | FeatureType[]): boolean {
  if (Array.isArray(type)) {
    // All of the types in the Feature need to be covered by the query.
    return type.find(subType => !hasMatch(subType, matches)) !== undefined
  }
  return hasMatch(type, matches)
}

export default function featureMatch (base: IFeature[], matchFeatures: IFeature[]): (Error[] | null) {
  let errors: Error[] = null
  for (let i = 0; i < matchFeatures.length; i++) {
    const matchFeature = matchFeatures[i]
    const hasMatch = base.find(baseFeature =>
      baseFeature.name === matchFeature.name
      && typesMatch(baseFeature.type, matchFeature.type)
    )
    if (!hasMatch) {
      const types = Array.isArray(matchFeature.type)
        ? matchFeature.type.map(type => FeatureType[type]).join(', ')
        : FeatureType[matchFeature.type]
      if (!errors) {
        errors = []
      }
      errors.push(new Error(`#${i}: ${matchFeature.name}[${types}] is not available.`))
    }
  }
  return errors
}
