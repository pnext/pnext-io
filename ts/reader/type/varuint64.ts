import createDynamicReader from '../util/createDynamicReader'
import readVarInt64 from '../util/readVarInt64'
import FeatureType from '../../api/FeatureType'

export default createDynamicReader(1, FeatureType.uint64, readVarInt64.bind(null, true))
