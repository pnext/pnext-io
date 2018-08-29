import createFixedReader from '../util/createFixedReader'
import FeatureType from '../../api/FeatureType'

export default createFixedReader(2, FeatureType.int16, (view: DataView, byteOffset: number) => view.getInt16(byteOffset))
