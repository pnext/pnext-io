import { createFixedSimpleReader } from '../util/createFixedReader'
import FeatureType from '../../api/FeatureType'

export default createFixedSimpleReader<number>(2, FeatureType.int16, (view: DataView, byteOffset: number) => view.getInt16(byteOffset, true))
