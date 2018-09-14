import IReader from '../IReader'
import { createFixedSimpleReader } from '../util/createFixedReader'
import FeatureType from '../../api/FeatureType'

const NULL_BUFFER = new ArrayBuffer(0)

export default function fixedBytes (length: number): IReader<ArrayBuffer> {
  if (length === 0) {
    return createFixedSimpleReader(0, FeatureType.bytes, (view: DataView, byteOffset: number) => NULL_BUFFER)
  }
  if (isNaN(length)) {
    throw new Error(`A fixed string needs a length: ${length}`)
  }
  return createFixedSimpleReader(length, FeatureType.bytes, (view: DataView, byteOffset: number) => view.buffer.slice(byteOffset, byteOffset + length))
}
