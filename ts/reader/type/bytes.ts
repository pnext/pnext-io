import twoPartReader from '../util/twoPartReader'
import uint32 from './uint32'
import fixedBytes from './fixedBytes'
import FeatureType from '../../api/FeatureType'

export default twoPartReader(uint32, fixedBytes, FeatureType.bytes)
