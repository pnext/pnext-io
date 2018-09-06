import { createFixedObjectReader } from './createFixedReader'
import IReader from '../IReader'
import FeatureType from '../../api/FeatureType'
import IFeature from '../../api/IFeature'

export interface IBits {
  0?: string,
  1?: string,
  2?: string,
  3?: string,
  4?: string,
  5?: string,
  6?: string,
  7?: string
}

function getBitShifts (bits: IBits) {
  const offsets: { [k: string]: number } = {}
  let nextFlag = 1
  return [bits[0], bits[1], bits[2], bits[3], bits[4], bits[5], bits[6], bits[7]]
    .map(field => {
      let offset = offsets[field]
      if (offset === undefined) {
        offset = 1
      } else {
        offset *= 2
      }
      offsets[field] = offset
      let flag = nextFlag
      nextFlag *= 2
      return { field, offset, flag }
    })
    .filter(bitShifts => bitShifts.field !== undefined)
}

function getType (bitShifts) {
  const type: { [key: string]: FeatureType } = {}
  for (const bitShift of bitShifts) {
    type[bitShift.field] = FeatureType.uint8
  }
  return type
}

export default function bits (bits: IBits): IReader {
  const bitShifts = getBitShifts(bits)
  const type = getType(bitShifts)
  return createFixedObjectReader(1, type, (view: DataView, byteOffset: number, target: { [key: string]: any }) => {
    const num = view.getUint8(byteOffset)
    for (const bitShift of bitShifts) {
      const option = (num & bitShift.flag) ? bitShift.offset : 0
      target[bitShift.field] = target[bitShift.field] | option
    }
  })
}
