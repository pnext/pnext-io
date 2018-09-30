import IReader from '../IReader'
import { createFixedObjectReader } from './createFixedReader'
import FeatureType, { FeatureObject } from '../../api/FeatureType'

export function fixedArray <T> (reader: IReader<T, FeatureType>, count: number): IReader<{ [key: string]: T }, FeatureObject> {
  if (count <= 0) {
    throw new Error(`Count(${count}) needs to be bigger than 0`)
  }
  if (!reader.fixedSize) {
    throw new Error('Fixed reader needs to be for a fixed-size object')
  }
  const types: FeatureObject = {}
  for (let key = 0; key < count; key++) {
    types[key] = reader.type
  }
  return createFixedObjectReader(reader.minSize * count, types, (view: DataView, byteOffset: number, target: { [key: string]: any }) => {
    for (let i = 0; i < count; i++) {
      target[i] = reader.read(view, byteOffset)
      byteOffset += reader.minSize
    }
  })
}
