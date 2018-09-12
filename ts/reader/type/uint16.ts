import { createFixedSimpleReader } from '../util/createFixedReader'
import FeatureType from '../../api/FeatureType'

export default createFixedSimpleReader<number>(2, FeatureType.uint16, (view: DataView, byteOffset: number) => view.getUint16(byteOffset))
