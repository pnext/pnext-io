import createFixedReader from '../util/createFixedReader'
import FeatureType from '../../api/FeatureType'

export default createFixedReader(2, FeatureType.uint16, (view: DataView, byteOffset: number) => view.getUint16(byteOffset, true))
