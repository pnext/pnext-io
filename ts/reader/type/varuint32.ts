import createDynamicReader from '../util/createDynamicReader'
import readVarUint32 from '../util/readVarUint32'

export default createDynamicReader(1, readVarUint32)
