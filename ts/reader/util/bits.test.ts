import bits, { IBits } from '../../../ts/reader/util/bits'

function dArr (arr: number[]): DataView {
  const buff = new Uint8Array(arr)
  return new DataView(buff.buffer)
}

function read (parts: IBits, testData: number) {
  const c = { byteOffset: 0, size: 0, data: null }
  const reader = bits(parts)
  return reader.read(dArr([testData]), 0)
}

test('only first bit', () => {
  const a = { 0: 'x' }
  expect(read(a, 0)).toMatchObject({ x: 0 }) // unset should be 0
  expect(read(a, 1)).toMatchObject({ x: 1 }) // set should be 1
})

test('only second bit', () => {
  const b = { 1: 'y' }
  expect(read(b, 0)).toMatchObject({ y: 0 }) // unset should be 0
  expect(read(b, 1)).toMatchObject({ y: 0 }) // setting other field should still be 0
  expect(read(b, 2)).toMatchObject({ y: 1 }) // set should be 1
  expect(read(b, 3)).toMatchObject({ y: 1 }) // set other as well should still be 1
  expect(read(b, 4)).toMatchObject({ y: 0 }) // bigger field should still be 4
})

test('multiple bits', () => {
  const c = { 0: 'z', 1: 'z', 2: 'z' }
  expect(read(c, 0)).toMatchObject({ z: 0 }) // unset should be 0
  expect(read(c, 1)).toMatchObject({ z: 1 }) // first field should be 1
  expect(read(c, 2)).toMatchObject({ z: 2 }) // second field should be 2
  expect(read(c, 3)).toMatchObject({ z: 3 }) // first and second field should together be 3
  expect(read(c, 4)).toMatchObject({ z: 4 }) // only forth bit should be 4
  expect(read(c, 5)).toMatchObject({ z: 5 }) // combination of 4 | 1
  expect(read(c, 6)).toMatchObject({ z: 6 }) // combination of 4 | 2
  expect(read(c, 7)).toMatchObject({ z: 7 }) // combination of 4 | 2 | 1
  expect(read(c, 8)).toMatchObject({ z: 0 }) // higher fields should be ignored
})

test('multiple bits with offset', () => {
  const d = { 1: 'r', 2: 'r', 4: 'r' }
  expect(read(d, 0)).toMatchObject({ r: 0 }) // unset should be 0
  expect(read(d, 1)).toMatchObject({ r: 0 }) // 1
  expect(read(d, 2)).toMatchObject({ r: 1 }) // 2
  expect(read(d, 3)).toMatchObject({ r: 1 }) // 3
  expect(read(d, 4)).toMatchObject({ r: 2 }) // 4
  expect(read(d, 5)).toMatchObject({ r: 2 }) // 5
  expect(read(d, 6)).toMatchObject({ r: 3 }) // 6
  expect(read(d, 7)).toMatchObject({ r: 3 }) // 7
  expect(read(d, 8)).toMatchObject({ r: 0 }) // 8
  expect(read(d, 9)).toMatchObject({ r: 0 }) // 9
  expect(read(d, 10)).toMatchObject({ r: 1 }) // 10
  expect(read(d, 11)).toMatchObject({ r: 1 }) // 11
  expect(read(d, 12)).toMatchObject({ r: 2 }) // 12
  expect(read(d, 13)).toMatchObject({ r: 2 }) // 13
  expect(read(d, 14)).toMatchObject({ r: 3 }) // 14
  expect(read(d, 15)).toMatchObject({ r: 3 }) // 15
  expect(read(d, 16)).toMatchObject({ r: 4 }) // 16
  expect(read(d, 17)).toMatchObject({ r: 4 }) // 17
  expect(read(d, 18)).toMatchObject({ r: 5 }) // 18
  expect(read(d, 19)).toMatchObject({ r: 5 }) // 19
  expect(read(d, 20)).toMatchObject({ r: 6 }) // 20
  expect(read(d, 21)).toMatchObject({ r: 6 }) // 21
  expect(read(d, 22)).toMatchObject({ r: 7 }) // 22
  expect(read(d, 23)).toMatchObject({ r: 7 }) // 23
  expect(read(d, 24)).toMatchObject({ r: 4 }) // 24
  expect(read(d, 25)).toMatchObject({ r: 4 }) // 25
  expect(read(d, 26)).toMatchObject({ r: 5 }) // 26
  expect(read(d, 27)).toMatchObject({ r: 5 }) // 27
})

test('various fields', () => {
  const e = { 0: 'a', 1: 'b', 2: 'a', 3: 'b', 4: 'c', 5: 'd', 6: 'e', 7: 'f' }
  const base = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 }
  expect(read(e, 0)).toMatchObject(base) // unset should be 0
  expect(read(e, 1)).toMatchObject({ ...base, a: 1 }) // 1 should set a
  expect(read(e, 2)).toMatchObject({ ...base, b: 1 }) // 2 should set b
  expect(read(e, 4)).toMatchObject({ ...base, a: 2 }) // 4 should set a
  expect(read(e, 8)).toMatchObject({ ...base, b: 2 }) // 8 should set b
  expect(read(e, 16)).toMatchObject({ ...base, c: 1 }) // 16 should set c
  expect(read(e, 32)).toMatchObject({ ...base, d: 1 }) // 32 should set d
  expect(read(e, 64)).toMatchObject({ ...base, e: 1 }) // 64 should set e
  expect(read(e, 128)).toMatchObject({ ...base, f: 1 }) // 128 should set f
  expect(read(e, 255)).toMatchObject({ a: 3, b: 3, c: 1, d: 1, e: 1, f: 1 }) // all fields should be set
})
