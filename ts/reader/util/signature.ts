import IReader from '../IReader'
import FeatureType from '../../api/FeatureType'
import { postOpSimple } from './postOp'
import fixedString from '../type/fixedString'

export function signature (signature: string) {
  return postOpSimple(fixedString(signature.length), FeatureType.string, (foundSignature: string) => {
    if (foundSignature !== signature) {
      throw new Error(`Signature [${foundSignature}] doesn't match the expected signature [${signature}]`)
    }
    return foundSignature
  })
}
