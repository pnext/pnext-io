import twoPartReader from '../util/twoPartReader'
import uint32LE from './uint32LE'
import fixedString from './fixedString'

export default twoPartReader(uint32LE, fixedString)
