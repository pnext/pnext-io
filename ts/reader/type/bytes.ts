import twoPartReader from '../util/twoPartReader'
import uint32 from './uint32'
import fixedBytes from './fixedBytes'

export default twoPartReader(uint32, fixedBytes)
