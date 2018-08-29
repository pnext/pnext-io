import createFixedReader from '../util/createFixedReader'
import FeatureType from '../../api/FeatureType'

export default createFixedReader(4, FeatureType.uint32, (view: DataView, byteOffset: number) => view.getUint32(byteOffset))
