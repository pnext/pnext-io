import readVarInt64 from '../util/readVarInt64'
import createDynamicReader from '../util/createDynamicReader'
import FeatureType from '../../api/FeatureType'

export default createDynamicReader(1, FeatureType.int64, readVarInt64.bind(null, false))
