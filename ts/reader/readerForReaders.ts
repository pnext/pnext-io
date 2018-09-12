import IFeature from '../api/IFeature'
import IReader from './IReader'
import IDynamicContext from './util/IDynamicContext'
import { createDynamicObjectReader } from './util/createDynamicReader'
import { createFixedObjectReader } from './util/createFixedReader'
import FeatureType from '../api/FeatureType'

const workContext: IDynamicContext = {
  byteOffset: 0,
  data: null,
  size: 0
}

function convertToObjectReader<T> (name: string, reader: IReader<T>): IReader<{ [key: string]: any }> {
  if (typeof reader.type === 'object') {
    return reader
  }
  if (reader.fixedSize) {
    return createFixedObjectReader(reader.minSize, { [name]: reader.type }, (view: DataView, byteOffset: number, target: { [key: string]: any }) => {
      target[name] = reader.read(view, byteOffset)
    })
  }
  return createDynamicObjectReader(reader.minSize, { [name]: reader.type }, (view: DataView, context: IDynamicContext, target: { [key: string]: any }) => {
    if (reader.readDynamic(view, context)) {
      target[name] = context.data
      context.data = target
      return true
    }
    return false
  })
}

function convertToObjectReaders (namedReaders: INamedReader[]) {
  let minSize = 0
  const readers = namedReaders.map(({ reader, name }, index) => {
    minSize += reader.minSize
    return convertToObjectReader(name, reader)
  })
  return {
    minSize,
    readers
  }
}

function collectTypes (namedReaders: INamedReader[]): { [k: string]: FeatureType } {
  const featuresByName: { [k: string]: FeatureType } = {}
  function addToFeatures (name, type: FeatureType) {
    if (featuresByName[name] !== undefined) {
      throw new Error(`${name} has been defined more than once in this combined reader.`)
    }
    featuresByName[name] = type
  }
  for (const { name, reader } of namedReaders) {
    const type = reader.type
    if (typeof type === 'object') {
      for (const typeName in type) {
        addToFeatures(typeName, type[typeName])
      }
    } else {
      addToFeatures(name, type)
    }
  }
  return featuresByName
}

function readerForDynamicFeatures (namedReaders: INamedReader[]): IReader<{ [key: string]: any }> {
  const { minSize, readers } = convertToObjectReaders(namedReaders)
  return createDynamicObjectReader(
    minSize,
    collectTypes(namedReaders),
    (view: DataView, context: IDynamicContext, target: { [key: string]: any }): boolean => {
      let size = 0
      // Some of the sub-readers could finish successfully and thus change the byteOffset for
      // Operation this would break the IDynamicContext contract because it wouldn't have actually
      // finished its work. To prevent this the workContext is used to check and later passed
      // on the to the actual context
      workContext.byteOffset = context.byteOffset
      for (const reader of readers) {
        if (reader.fixedSize) {
          reader.readTo(view, workContext.byteOffset, target)
          workContext.byteOffset += reader.minSize
          size += reader.minSize
        } else {
          if (!reader.readDynamicTo(view, workContext, target)) {
            return false
          }
          size += workContext.size
        }
      }
      // Reapply the new sub
      context.byteOffset = workContext.byteOffset
      context.size = size
      context.data = target
      return true
    }
  )
}

function readerForFixedFeatures (namedReaders: INamedReader[]): IReader<{ [key: string]: any }> {
  const { minSize, readers } = convertToObjectReaders(namedReaders)
  return createFixedObjectReader(minSize, collectTypes(namedReaders), (view: DataView, byteOffset: number, target: { [key: string]: any }) => {
    for (const reader of readers) {
      reader.readTo(view, byteOffset, target)
      byteOffset += reader.minSize
    }
  })
}

export interface INamedReader<T = any> {
  name: string,
  reader: IReader<T>
}

export default function readerForReaders (namedReaders: INamedReader[]): IReader<{ [key: string]: any }> {
  const fixedSize: boolean = namedReaders.find(({ reader }) => !reader.fixedSize) === undefined
  if (fixedSize) {
    return readerForFixedFeatures(namedReaders)
  }
  return readerForDynamicFeatures(namedReaders)
}
