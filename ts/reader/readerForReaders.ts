import IFeature from '../api/IFeature'
import IReader from './IReader'
import readerForFeatureType from './readerForFeatureType'
import IDynamicContext from './util/IDynamicContext'
import createDynamicReader from './util/createDynamicReader'
import createFixedReader from './util/createFixedReader'

const workContext: IDynamicContext = {
  byteOffset: 0,
  data: null,
  size: 0
}
function readerForDynamicFeatures (namedReaders: INamedReader[]): IReader {
  const minSize = namedReaders.reduce((minSize: number, { reader }) => minSize + reader.minSize, 0)
  return createDynamicReader(minSize, (view: DataView, context: IDynamicContext): boolean => {
    const data = {}
    let size = 0
    let index = 0
    // Some of the sub-readers could finish successfully and thus change the byteOffset for
    // Operation this would break the IDynamicContext contract because it wouldn't have actually
    // finished its work. To prevent this the workContext is used to check and later passed
    // on the to the actual context
    workContext.byteOffset = context.byteOffset
    for (const { reader, name } of namedReaders) {
      if (reader.fixedSize) {
        data[name] = reader.read(view, workContext.byteOffset)
        workContext.byteOffset += reader.minSize
        size += reader.minSize
      } else {
        if (!reader.readDynamic(view, workContext)) {
          return false
        }
        data[name] = workContext.data
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

function readerForFixedFeatures (namedReaders: INamedReader[]): IReader {
  let size = 0
  const readFns = namedReaders.map(({ reader, name }, index) => {
    const offset = size
    size += reader.minSize
    return (view: DataView, byteOffset: number, result: { [k: string]: any }) => {
      result[name] = reader.read(view, byteOffset + offset)
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

export interface INamedReader {
  name: string,
  reader: IReader
}

export default function readerForReaders (namedReaders: INamedReader[]): IReader {
  const fixedSize: boolean = namedReaders.find(({ reader }) => !reader.fixedSize) === undefined
  if (fixedSize) {
    return readerForFixedFeatures(namedReaders)
  }
  return readerForDynamicFeatures(namedReaders)
}
