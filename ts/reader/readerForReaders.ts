import IFeature from '../api/IFeature'
import IReader from './IReader'
import IDynamicContext from './util/IDynamicContext'
import { createDynamicObjectReader } from './util/createDynamicReader'
import { createFixedObjectReader, createFixedSimpleReader } from './util/createFixedReader'
import FeatureType from '../api/FeatureType'
import { createWorkContext } from './util/createWorkContext'

const workContext = createWorkContext()

function prefixType (type: { [key: string]: FeatureType }, prefix: string) {
  const newType: { [key: string]: FeatureType } = {}
  const keyMaps: {
    from: string,
    to: string
  }[] = []
  for (const name in type) {
    const newName = `${prefix}${name}`
    newType[newName] = type[name]
    keyMaps.push({
      from: name,
      to: newName
    })
  }
  return {
    newType,
    map (from: { [key: string]: any }, to: { [key: string]: any }) {
      for (const keyMap of keyMaps) {
        to[keyMap.to] = from[keyMap.from]
      }
    }
  }
}

function mapObjectReader<T> (name: string, reader: IReader<{ [key: string]: any }, { [key: string]: FeatureType }>) {
  if (name === '') {
    // No mapping required
    return reader
  }
  const temp = {}
  const { newType, map } = prefixType(reader.type, name)
  if (reader.fixedSize) {
    return createFixedObjectReader(reader.minSize, newType, (view: DataView, byteOffset: number, target: { [key: string]: any }) => {
      reader.readTo(view, byteOffset, temp)
      map(temp, target)
    })
  }
  return createDynamicObjectReader(reader.minSize, newType, (view: DataView, context: IDynamicContext, target: { [key: string]: any }) => {
    if (reader.readDynamicTo(view, context, temp)) {
      map(temp, target)
      return true
    }
    return false
  })
}

export function convertToObjectReader<T> (name: string, reader: IReader<T>): IReader<{ [key: string]: any }, { [key: string]: FeatureType }> {
  if (typeof reader.type === 'object') {
    return mapObjectReader(name, reader as IReader<T, { [key: string]: FeatureType }>)
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

function collectTypes (readers: IReader<{ [key: string]: any }, { [key: string]: FeatureType }>[]): { [k: string]: FeatureType } {
  const featuresByName: { [k: string]: FeatureType } = {}
  function addToFeatures (name, type: FeatureType) {
    if (featuresByName[name] !== undefined) {
      throw new Error(`${name} has been defined more than once in this combined reader.`)
    }
    featuresByName[name] = type
  }
  for (const { type } of readers) {
    for (const typeName in type) {
      addToFeatures(typeName, type[typeName])
    }
  }
  return featuresByName
}

function readerForDynamicFeatures <T extends { [key: string]: any }> (namedReaders: INamedReader[]): IReader<T, { [key: string]: FeatureType }> {
  const { minSize, readers } = convertToObjectReaders(namedReaders)
  return createDynamicObjectReader(
    minSize,
    collectTypes(readers),
    (view: DataView, context: IDynamicContext, target: { [key: string]: any }): boolean => {
      let size = 0
      // Some of the sub-readers could finish successfully and thus change the byteOffset for
      // Operation this would break the IDynamicContext contract because it wouldn't have actually
      // finished its work. To prevent this the workContext is used to check and later passed
      // on the to the actual context
      workContext.byteOffset = context.byteOffset
      for (const reader of readers) {
        if (reader.fixedSize) {
          if (view.byteLength - workContext.byteOffset < reader.minSize) {
            return false
          }
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

export function readerForFixedFeatures <T> (namedReaders: INamedReader[]): IReader<T, { [key: string]: FeatureType }> {
  if (!isFixedSize(namedReaders)) {
    throw new Error('Readers arnt fixed in size.')
  }
  const { minSize, readers } = convertToObjectReaders(namedReaders)
  return createFixedObjectReader<T>(minSize, collectTypes(readers), (view: DataView, byteOffset: number, target: { [key: string]: any }) => {
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

function isFixedSize (namedReaders: INamedReader[]): boolean {
  return namedReaders.find(({ reader }) => !reader.fixedSize) === undefined
}

export default function readerForReaders <T extends { [key: string]: any } = { [key: string]: any }> (namedReaders: INamedReader[]) {
  if (isFixedSize(namedReaders)) {
    return readerForFixedFeatures<T>(namedReaders)
  }
  return readerForDynamicFeatures<T>(namedReaders)
}
