import { createFixedSimpleReader } from '../util/createFixedReader'
import Long from 'long'
import FeatureType from '../../api/FeatureType'

export default createFixedSimpleReader<number | Long>(8, FeatureType.int64, (view: DataView, byteOffset: number) => {
  const arr: any = new Uint8Array(view.buffer.slice(byteOffset, byteOffset + 8))
  const long = Long.fromBytesLE(arr, false)
  if (long.lte(Number.MAX_SAFE_INTEGER) && long.gte(Number.MIN_SAFE_INTEGER)) {
    return long.toNumber()
  }
  return long
})
