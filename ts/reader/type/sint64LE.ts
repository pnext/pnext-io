import createFixedReader from '../util/createFixedReader'
import Long from 'long'
import zzDecodeLong from '../util/zzDecodeLong'

export default createFixedReader(8, (view: DataView, byteOffset: number) => {
  const high = view.getInt32(byteOffset, true)
  const low = view.getInt32(byteOffset, true)
  return zzDecodeLong(new Long(low, high, false))
})
