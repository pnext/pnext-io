import { createFixedSimpleReader } from '../util/createFixedReader'
import FeatureType from '../../api/FeatureType'

export default createFixedSimpleReader<number>(8, FeatureType.double, (view: DataView, byteOffset: number) => view.getFloat64(byteOffset))
