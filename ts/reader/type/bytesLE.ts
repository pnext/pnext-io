import twoPartReader from '../util/twoPartReader'
import uint32LE from './uint32LE'
import fixedBytesReader from './fixedBytes'
import FeatureType from '../../api/FeatureType'

export default twoPartReader(uint32LE, fixedBytesReader, FeatureType.bytes)
