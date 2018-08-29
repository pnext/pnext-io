import createFixedReader from '../util/createFixedReader'
import Long from 'long'
import FeatureType from '../../api/FeatureType'

export default createFixedReader(8, FeatureType.int64, (view: DataView, byteOffset: number) => {
  const high = view.getInt32(byteOffset, true)
  const low = view.getInt32(byteOffset, true)
  return new Long(low, high, false)
})
