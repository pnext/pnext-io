import twoPartReader from '../util/twoPartReader'
import uint32 from './uint32'
import fixedString from './fixedString'

export default twoPartReader(uint32, fixedString)
