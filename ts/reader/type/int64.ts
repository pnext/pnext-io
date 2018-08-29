import createFixedReader from '../util/createFixedReader'
import Long from 'long'
import FeatureType from '../../api/FeatureType'

export default createFixedReader(8, FeatureType.int64, (view: DataView, byteOffset: number) => new Long(view.getInt32(byteOffset), view.getInt32(byteOffset), false))
