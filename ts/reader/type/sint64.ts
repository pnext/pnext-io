import createFixedReader from '../util/createFixedReader'
import Long from 'long'
import zzDecodeLong from '../util/zzDecodeLong'

export default createFixedReader(8, (view: DataView, byteOffset: number) => zzDecodeLong(new Long(view.getInt32(byteOffset), view.getInt32(byteOffset), false)))
