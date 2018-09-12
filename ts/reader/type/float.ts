import { createFixedSimpleReader } from '../util/createFixedReader'
import FeatureType from '../../api/FeatureType'

export default createFixedSimpleReader<number>(4, FeatureType.float, (view: DataView, byteOffset: number) => view.getFloat32(byteOffset))
