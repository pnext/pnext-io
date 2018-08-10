import IFeature from '../api/IFeature'
import IReader, { createDynamicReader, createFixedReader } from './IReader'
import readerForFeatureType from './readerForFeatureType'
import IDynamicResult from './IDynamicResult'

function readerForDynamicFeatures (features: IFeature[], readers: IReader[]): IReader {
  const minSize = readers.reduce((minSize: number, reader: IReader) => minSize + reader.minSize, 0)
  return createDynamicReader(minSize, (view: DataView, byteOffset: number): IDynamicResult => {
    const result: IDynamicResult = {
      size: 0,
      byteOffset,
      data: {}
    }
    readers.forEach((reader, index): void => {
      const feature = features[index]
      // TODO: Implement a size check
      if (reader.fixedSize) {
        const featureResult = reader.read(view, byteOffset)
        result.size += reader.size
        result.data[feature.name] = featureResult.data
        byteOffset += reader.size
      } else {
        const featureResult = reader.readDynamic(view, byteOffset)
        result.size += featureResult.size
        result.data[feature.name] = featureResult.data
        byteOffset = featureResult.byteOffset
      }
    })
    return result
  })
}

function readerForFixedFeatures (features: IFeature[], readers: IReader[]): IReader {
  let size = 0
  const readFns = features.map((feature, index) => {
    const reader = readers[index]
    const offset = size
    const target = feature.name
    size += reader.size
    return (view: DataView, byteOffset: number, result: { [k: string]: any }) => {
      result[target] = reader.read(view, byteOffset + offset)
    }
  })
  return createFixedReader(size, (view: DataView, byteOffset: number) => {
    const result = {}
    for (const readFn of readFns) {
      readFn(view, byteOffset, result)
    }
    return result
  })
}

export default function readerForFeatures (features: IFeature[]): IReader {
  const readers: IReader[] = features.map(feature => readerForFeatureType(feature.type, feature.length))
  const fixedSize: boolean = readers.find(reader => !reader.fixedSize) === undefined
  if (fixedSize) {
    return readerForFixedFeatures(features, readers)
  }
  return readerForDynamicFeatures(features, readers)
}
