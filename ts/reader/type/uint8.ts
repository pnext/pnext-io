import { createFixedSimpleReader } from '../util/createFixedReader'
import FeatureType from '../../api/FeatureType'

export default createFixedSimpleReader<number>(1, FeatureType.uint8, (view: DataView, byteOffset: number) => view.getUint8(byteOffset))
