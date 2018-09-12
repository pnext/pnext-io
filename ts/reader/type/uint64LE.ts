import { createFixedSimpleReader } from '../util/createFixedReader'
import Long from 'long'
import FeatureType from '../../api/FeatureType'

export default createFixedSimpleReader<number | Long>(8, FeatureType.uint64, (view: DataView, byteOffset: number) => {
  const high = view.getInt32(byteOffset, true)
  const low = view.getInt32(byteOffset, true)
  if (high === 0) {
    return low
  }
  return new Long(low, high, true)
})
