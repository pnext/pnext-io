import IFeature from '../api/IFeature'
import IReader, { createDynamicReader, createFixedReader } from './IReader'
import readerForFeatureType from './readerForFeatureType'
import IDynamicContext from './IDynamicContext'
const workContext: IDynamicContext = {
  byteOffset: 0,
  data: null,
  size: 0
}
function readerForDynamicFeatures (features: IFeature[], readers: IReader[]): IReader {
  const minSize = readers.reduce((minSize: number, reader: IReader) => minSize + reader.minSize, 0)
  return createDynamicReader(minSize, (view: DataView, context: IDynamicContext): boolean => {
    const data = {}
    let size = 0
    let index = 0
    // Some of the sub-readers could finish successfully and thus change the byteOffset for
    // Operation this would break the IDynamicContext contract because it wouldn't have actually
    // finished its work. To prevent this the workContext is used to check and later passed
    // on the to the actual context
    workContext.byteOffset = context.byteOffset
    for (const reader of readers) {
      const feature = features[index++]
      if (reader.fixedSize) {
        data[feature.name] = reader.read(view, workContext.byteOffset)
        workContext.byteOffset += reader.minSize
        size += reader.minSize
      } else {
        if (!reader.readDynamic(view, workContext)) {
          return false
        }
        data[feature.name] = workContext.data
        size += workContext.size
      }
    }
    // Reapply the new sub
    context.byteOffset = workContext.byteOffset
    context.size = size
    context.data = data
    return true
  })
}

function readerForFixedFeatures (features: IFeature[], readers: IReader[]): IReader {
  let size = 0
  const readFns = features.map((feature, index) => {
    const reader = readers[index]
    const offset = size
    const target = feature.name
    size += reader.minSize
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
