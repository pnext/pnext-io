import twoPartReader from '../util/twoPartReader'
import uint32 from './uint32'
import fixedBytes from './fixedBytes'
import FeatureType from '../../api/FeatureType'

export default twoPartReader <number, ArrayBuffer>(uint32, fixedBytes, FeatureType.bytes)
