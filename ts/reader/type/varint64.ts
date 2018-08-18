import readVarInt64 from '../util/readVarInt64'
import createDynamicReader from '../util/createDynamicReader'

export default createDynamicReader(1, readVarInt64.bind(null, false))
