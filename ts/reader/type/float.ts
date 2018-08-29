import createFixedReader from '../util/createFixedReader'
import FeatureType from '../../api/FeatureType'

export default createFixedReader(4, FeatureType.float, (view: DataView, byteOffset: number) => view.getFloat32(byteOffset))
