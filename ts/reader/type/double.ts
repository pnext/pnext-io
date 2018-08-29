import createFixedReader from '../util/createFixedReader'
import FeatureType from '../../api/FeatureType'

export default createFixedReader(8, FeatureType.double, (view: DataView, byteOffset: number) => view.getFloat64(byteOffset))
