import { createFixedSimpleReader } from '../util/createFixedReader'
import FeatureType from '../../api/FeatureType'

export default createFixedSimpleReader<number>(1, FeatureType.int8, (view: DataView, byteOffset: number) => view.getInt8(byteOffset))
