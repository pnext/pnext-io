import { twoPartSimpleReader } from '../util/twoPartReader'
import varuint32 from './varuint32'
import fixedBytesReader from './fixedBytes'
import FeatureType from '../../api/FeatureType'

export default twoPartSimpleReader(varuint32, fixedBytesReader, FeatureType.bytes)
