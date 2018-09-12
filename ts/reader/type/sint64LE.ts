import { createFixedSimpleReader } from '../util/createFixedReader'
import Long from 'long'
import zzDecodeLong from '../util/zzDecodeLong'
import FeatureType from '../../api/FeatureType'

export default createFixedSimpleReader<number | Long>(8, FeatureType.int64, (view: DataView, byteOffset: number) => {
  const high = view.getInt32(byteOffset, true)
  const low = view.getInt32(byteOffset, true)
  return zzDecodeLong(new Long(low, high, false))
})
