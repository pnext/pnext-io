import createFixedReader from '../util/createFixedReader'
import FeatureType from '../../api/FeatureType'

export default createFixedReader(1, FeatureType.uint8, (view: DataView, byteOffset: number) => view.getUint8(byteOffset))
