import twoPartReader from '../util/twoPartReader'
import uint32LE from './uint32LE'
import fixedBytesReader from './fixedBytes'

export default twoPartReader(uint32LE, fixedBytesReader)
