import createFixedReader from '../util/createFixedReader'
import FeatureType from '../../api/FeatureType'

export default createFixedReader(4, FeatureType.int32LE, (view: DataView, byteOffset: number) => view.getInt32(byteOffset, true))
