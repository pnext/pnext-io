import FeatureType from '../../api/FeatureType'
import IReader from '../IReader'
import fixedString from './fixedString'
import { postOpSimple } from '../util/postOp'

export default function fixedTrimmedString (length: number): IReader<string, FeatureType> {
  return postOpSimple(fixedString(length), FeatureType.string, str => {
    return str.replace(/\u0000+$/g, '')
  })
}
