import createDynamicReader from '../util/createDynamicReader'
import readVarUint32 from '../util/readVarUint32'
import FeatureType from '../../api/FeatureType'

export default createDynamicReader(1, FeatureType.uint32, readVarUint32)
