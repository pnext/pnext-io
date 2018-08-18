import createDynamicReader from '../util/createDynamicReader'
import readVarInt64 from '../util/readVarInt64'

export default createDynamicReader(1, readVarInt64.bind(null, true))
