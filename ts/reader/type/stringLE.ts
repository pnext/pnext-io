import { twoPartSimpleReader } from '../util/twoPartReader'
import uint32LE from './uint32LE'
import fixedString from './fixedString'
import FeatureType from '../../api/FeatureType'

export default twoPartSimpleReader(uint32LE, fixedString, FeatureType.string)
