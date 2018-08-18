import createDynamicReader from '../util/createDynamicReader'
import readBytesLE from '../util/readBytesLE'

export default createDynamicReader(5, readBytesLE)
