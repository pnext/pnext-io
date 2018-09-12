import { createFixedSimpleReader } from '../util/createFixedReader'
import IReader from '../IReader'
import decodeUtf8 from 'decode-utf8'
import fixedBytes from './fixedBytes'
import FeatureType from '../../api/FeatureType'

export default function fixedString (length: number) {
  if (length === 0) {
    return createFixedSimpleReader(0, FeatureType.string, (view: DataView, byteOffset: number) => '')
  }
  if (isNaN(length)) {
    throw new Error(`A fixed string needs a length: ${length}`)
  }
  const bytesReader = fixedBytes(length)
  return createFixedSimpleReader(length, FeatureType.string, (view: DataView, byteOffset: number) => decodeUtf8(bytesReader.read(view, byteOffset)))
}
