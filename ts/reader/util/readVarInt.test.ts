import readVarInt from './readVarInt'

function dArr (arr: number[]): DataView {
  const buff = new Uint8Array(arr)
  return new DataView(buff.buffer)
}

function read (...arr: number[]) {
  const c = { byteOffset: 0, size: 0, data: null }
  const works = readVarInt(dArr(arr), c)
  return {
    works,
    data: c.data,
    size: c.size
  }
}

test('varuint32-read', () => {
  expect(read(0)).toMatchObject({ works: true, data: 0, size: 1 }) // single byte zero
  expect(read(1)).toMatchObject({ works: true, data: 1, size: 1 }) // single byte 1
  expect(read(127)).toMatchObject({ works: true, data: 127, size: 1 }) // single byte 127
  expect(read(128)).toMatchObject({ works: false, data: null, size: 0 }) // double byte, second byte missing
  expect(read(255, 1)).toMatchObject({ works: true, data: 255, size: 2 }) // double byte 255
  expect(read(255, 128)).toMatchObject({ works: false, data: null, size: 0 }) // triple byte, third byte missing
  expect(read(255, 128, 3)).toMatchObject({ works: true, data: 49279, size: 3 }) // triple byte 49279
  expect(read(255, 128, 130)).toMatchObject({ works: false, data: null, size: 0 }) // quadruple byte, forth byte missing
  expect(read(255, 128, 130, 1)).toMatchObject({ works: true, data: 2130047, size: 4 }) // quadruple byte 2130047
  expect(read(255, 128, 130, 131)).toMatchObject({ works: false, data: null, size: 0 }) // quituple byte, fifth byte missing
  expect(read(255, 128, 130, 131, 1)).toMatchObject({ works: true, data: 274759807, size: 5 }) // quituple byte, 274759807
  expect(read(255, 255, 255, 255, 255)).toMatchObject({ works: true, data: 4294967295, size: 6 }) // quituple byte, max value = 4294967295
  expect(read(255, 128, 130, 131, 255, 1)).toMatchObject({ works: true, data: 4032856191, size: 6 }) // additional bytes ignored
})
