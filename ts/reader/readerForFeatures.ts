import IFeature from '../api/IFeature'
import IReader from './IReader'
import readerForReaders from './readerForReaders'
import readerForFeatureType from './readerForFeatureType'

export default function readerForFeatures (features: IFeature[]): IReader {
  return readerForReaders(
    features.map(feature => ({
      reader: readerForFeatureType(feature.type, feature.length),
      name: feature.name
    }))
  )
}
