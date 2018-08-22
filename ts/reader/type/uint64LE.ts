import createFixedReader from '../util/createFixedReader'
import Long from 'long'

export default createFixedReader(8, (view: DataView, byteOffset: number) => {
  const high = view.getInt32(byteOffset, true)
  const low = view.getInt32(byteOffset, true)
  return new Long(low, high, true)
})
