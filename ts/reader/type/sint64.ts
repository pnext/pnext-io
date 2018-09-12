import { createFixedSimpleReader } from '../util/createFixedReader'
import Long from 'long'
import zzDecodeLong from '../util/zzDecodeLong'
import FeatureType from '../../api/FeatureType'

export default createFixedSimpleReader<number | Long>(8, FeatureType.int64, (view: DataView, byteOffset: number) => zzDecodeLong(new Long(view.getInt32(byteOffset), view.getInt32(byteOffset), false)))
