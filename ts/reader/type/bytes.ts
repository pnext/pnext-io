import createDynamicReader from '../util/createDynamicReader'
import readBytes from '../util/readBytes'

export default createDynamicReader(5, readBytes)
