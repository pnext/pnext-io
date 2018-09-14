import twoPartReader from '../util/twoPartReader'
import uint32 from './uint32'
import fixedString from './fixedString'
import FeatureType from '../../api/FeatureType'

export default twoPartReader(uint32, fixedString, FeatureType.string)
