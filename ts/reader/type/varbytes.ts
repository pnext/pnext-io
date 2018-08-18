import createDynamicReader from '../util/createDynamicReader'
import readVarbytes from '../util/readVarbytes'

export default createDynamicReader(2, readVarbytes)
