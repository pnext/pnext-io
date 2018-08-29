import createFixedReader from '../util/createFixedReader'
import IReader from '../IReader'
import decodeUtf8 from 'decode-utf8'
import fixedBytes from './fixedBytes'
import FeatureType from '../../api/FeatureType'

export default function fixedString (length: number): IReader {
  if (length === 0) {
    return createFixedReader(0, FeatureType.string, (view: DataView, byteOffset: number) => '')
  }
  if (isNaN(length)) {
    throw new Error(`A fixed string needs a length: ${length}`)
  }
  const bytesReader = fixedBytes(length)
  return createFixedReader(length, FeatureType.string, (view: DataView, byteOffset: number) => decodeUtf8(bytesReader.read(view, byteOffset)))
}
