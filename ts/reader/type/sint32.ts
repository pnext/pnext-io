import { createFixedSimpleReader } from '../util/createFixedReader'
import FeatureType from '../../api/FeatureType'

export default createFixedSimpleReader<number>(4, FeatureType.int32, (view: DataView, byteOffset: number) => view.getInt32(byteOffset) | 0)
