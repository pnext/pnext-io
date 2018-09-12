import readVarInt64 from '../util/readVarInt64'
import { createDynamicSimpleReader } from '../util/createDynamicReader'
import FeatureType from '../../api/FeatureType'

export default createDynamicSimpleReader<number | Long>(1, FeatureType.int64, readVarInt64.bind(null, false))
