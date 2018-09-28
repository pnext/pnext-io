import IReader from '../IReader'
import { createFixedObjectReader } from './createFixedReader'
import FeatureType from '../../api/FeatureType'

export function fixedArray <T, FeatureType> (reader: IReader<T, FeatureType>, count: number): IReader<T[]> {
  if (!reader.fixedSize) {
    throw new Error('Fixed reader needs to be for a fixed-size object')
  }
  const types = {}
  for (let key = 0; key < count; key++) {
    types[key] = reader.type
  }
  return createFixedObjectReader(reader.minSize * count, types, (view: DataView, byteOffset: number, target: { [key: string]: any }) => {
    for (let i = 0; i < count; i++) {
      types[i] = reader.read(view, byteOffset)
    }
  })
}
