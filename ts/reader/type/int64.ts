import createFixedReader from '../util/createFixedReader'
import Long from 'long'

export default createFixedReader(8, (view: DataView, byteOffset: number) => new Long(view.getInt32(byteOffset), view.getInt32(byteOffset), false))
