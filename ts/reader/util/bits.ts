import createFixedReader from './createFixedReader'
import IReader from '../IReader'

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

export default function bits (bits: IBits): IReader {
  let formerField = null
  let offsets: { [k: string]: number } = {}
  let nextFlag = 1
  const bitShifts = [bits[0], bits[1], bits[2], bits[3], bits[4], bits[5], bits[6], bits[7]].map(field => {
    let offset = offsets[field]
    if (offset === undefined) {
      offset = 1
    } else {
      offset *= 2
    }
    offsets[field] = offset
    let flag = nextFlag
    nextFlag *= 2
    return { name: field, offset, flag }
  })
  return createFixedReader(1, (view: DataView, byteOffset: number) => {
    const num = view.getUint8(byteOffset)
    const result = {}
    for (const bitShift of bitShifts) {
      if (bitShift.name !== undefined) {
        let option = (num & bitShift.flag) ? bitShift.offset : 0
        const x = result[bitShift.name] | option
        result[bitShift.name] = x
      }
    }
    return result
  })
}
