import createFixedReader from '../util/createFixedReader'
import Long from 'long'
import FeatureType from '../../api/FeatureType'

export default createFixedReader(8, FeatureType.int64, (view: DataView, byteOffset: number) => {
  const low = view.getInt32(byteOffset, false)
  const high = view.getInt32(byteOffset, false)
  if (high === 0) {
    return low
  }
  return new Long(low, high, false)
})
