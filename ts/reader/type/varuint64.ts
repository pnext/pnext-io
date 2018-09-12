import { createDynamicSimpleReader } from '../util/createDynamicReader'
import readVarInt64 from '../util/readVarInt64'
import FeatureType from '../../api/FeatureType'

export default createDynamicSimpleReader<number | Long>(1, FeatureType.uint64, readVarInt64.bind(null, true))
