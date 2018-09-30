import { twoPartSimpleReader } from '../../../ts/reader/util/twoPartReader'
import uint32 from '../../../ts/reader/type/uint32'
import varuint32 from '../../../ts/reader/type/varuint32'
import fixedString from '../../../ts/reader/type/fixedString'
import IReader from '../../../ts/reader/IReader'
import FeatureType from '../../../ts/api/FeatureType'

const BYTE_128_STRING = '01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567'

function c (char: string) {
  return char.charCodeAt(0)
}

function chars (str: string) {
  const arr: number[] = []
  for (let i = 0; i < str.length; i++) {
    arr.push(str.charCodeAt(i))
  }
  return arr
}

function createRead (reader: IReader<any>) {
  return (bytes: number[]) => {
    const ctx = { byteOffset: 0, data: null, size: 0 }
    const works = reader.readDynamic(new DataView(new Uint8Array(bytes).buffer), ctx)
    return { works, data: ctx.data, size: ctx.size }
  }
}

test('fixed, fixed', () => {
  const reader = twoPartSimpleReader(uint32, fixedString, FeatureType.string)
  expect(reader.fixedSize).toBe(false)
  expect(reader.minSize).toBe(4) // minSize should be equal partA minSize

  const read = createRead(reader)
  expect(read([0, 0, 0, 3].concat(chars('ab')))).toMatchObject({ works: false, data: null, size: 0 }) // too small buffer doesnt work
  expect(read([0, 0, 0, 3].concat(chars('abc')))).toMatchObject({ works: true, data: 'abc', size: 7 }) // right size buffer works
})

test('fixed, dynamic', () => {
  const reader = twoPartSimpleReader(uint32, num => {
    expect(num).toBe(4) // former number properly read
    return varuint32
  }, FeatureType.uint32)
  expect(reader.fixedSize).toBe(false)
  expect(reader.minSize).toBe(4) // minSize should be equal partA minSize

  const read = createRead(reader)
  expect(read([0, 0, 0, 4])).toMatchObject({ works: false, data: null, size: 0 }) // 'too small buffer doesnt work
  expect(read([0, 0, 0, 4, 99])).toMatchObject({ works: true, data: 99, size: 5 }) // 'right size buffer works
  expect(read([0, 0, 0, 4, 255, 12])).toMatchObject({ works: true, data: 1663, size: 6 }) // 'string successfully read
})

test('dynamic, fixed', () => {
  const reader = twoPartSimpleReader(varuint32, fixedString, FeatureType.string)
  expect(reader.fixedSize).toBe(false) // isnt fixed size
  expect(reader.minSize).toBe(1) // minsize should be equal partA minSize

  const read = createRead(reader)
  expect(read([0])).toMatchObject({ works: true, data: '', size: 1 }) // empty string
  expect(read([1, c('a')])).toMatchObject({ works: true, data: 'a', size: 2 }) // single byte-size string
  expect(read([2].concat(chars(BYTE_128_STRING)))).toMatchObject({ works: true, data: '01', size: 3 }) // single byte-size string, of a larger data set
  expect(read([128, 1].concat(chars(BYTE_128_STRING)))).toMatchObject({ works: true, data: BYTE_128_STRING, size: 130 }) // double byte-size string
})

test('dynamic, dynamic', () => {
  const reader = twoPartSimpleReader(varuint32, num => {
    return varuint32
  }, FeatureType.uint32)
  expect(reader.fixedSize).toBe(false) // isnt fixed size
  expect(reader.minSize).toBe(1) // minsize should be equal partA minSize

  const read = createRead(reader)
  expect(read([0])).toMatchObject({ works: false, data: null, size: 0 }) // missing second number
  expect(read([0, 0])).toMatchObject({ works: true, data: 0, size: 2 }) // working second number
  expect(read([128, 1, 128, 1])).toMatchObject({ works: true, data: 128, size: 4 }) // two dynamic sized numbers
})
