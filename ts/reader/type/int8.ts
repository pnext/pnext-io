import createFixedReader from '../util/createFixedReader'
import FeatureType from '../../api/FeatureType'

export default createFixedReader(1, FeatureType.int8, (view: DataView, byteOffset: number) => view.getInt8(byteOffset))
