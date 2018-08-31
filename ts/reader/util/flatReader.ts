import IReader from '../IReader'
import IFeature from '../../api/IFeature'
import FeatureType from '../../api/FeatureType'
import postOp from './postOp'

export default function flattenReader (reader: IReader): IReader {
  if (!Array.isArray(reader.type)) {
    // Not an array, doesn't need flattening
    return reader
  }
  let needsFlattening = false
  let types: IFeature[] = []
  const fieldNameCheck: { [name: string]: IFeature} = {}

  function addField (feature: IFeature) {
    if (fieldNameCheck[feature.name] !== undefined) {
      throw new Error(`Can not flatten reader because the field ${feature.name} is set twice!`)
    }
    fieldNameCheck[feature.name] = feature
    types.push(feature)
  }

  const flatFeatures: IFeature[] = []
  for (const feature of reader.type) {
    if (Array.isArray(feature.type)) {
      needsFlattening = true
      flatFeatures.push(feature)
      for (const subFeature of feature.type) {
        addField(subFeature)
      }
    } else {
      addField(feature)
    }
  }
  if (!needsFlattening) {
    return reader
  }
  return postOp(reader, types, obj => {
    for (const feature of flatFeatures) {
      const orig = obj[feature.name]
      delete obj[feature.name]
      for (const subFeature of (feature.type as IFeature[])) {
        obj[subFeature.name] = orig[subFeature.name]
      }
    }
    return obj
  })
}
