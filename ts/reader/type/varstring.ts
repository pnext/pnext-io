import twoPartReader from '../util/twoPartReader'
import varuint32 from './varuint32'
import fixedString from './fixedString'
import FeatureType from '../../api/FeatureType'

export default twoPartReader(varuint32, fixedString, FeatureType.string)
