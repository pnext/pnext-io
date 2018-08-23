#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import readVarInt from '../../../ts/reader/util/readVarInt'
import IDynamicContext from '../../../ts/reader/util/IDynamicContext'

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

test('varuint32-read', async t => {
  t.deepEquals(read(0), { works: true, data: 0, size: 1 }, 'single byte zero')
  t.deepEquals(read(1), { works: true, data: 1, size: 1 }, 'single byte 1')
  t.deepEquals(read(127), { works: true, data: 127, size: 1 }, 'single byte 127')
  t.deepEquals(read(128), { works: false, data: null, size: 0 }, 'double byte, second byte missing')
  t.deepEquals(read(255, 1), { works: true, data: 255, size: 2 }, 'double byte 255')
  t.deepEquals(read(255, 128), { works: false, data: null, size: 0 }, 'triple byte, third byte missing')
  t.deepEquals(read(255, 128, 3), { works: true, data: 49279, size: 3 }, 'triple byte 49279')
  t.deepEquals(read(255, 128, 130), { works: false, data: null, size: 0 }, 'quadruple byte, forth byte missing')
  t.deepEquals(read(255, 128, 130, 1), { works: true, data: 2130047, size: 4 }, 'quadruple byte 2130047')
  t.deepEquals(read(255, 128, 130, 131), { works: false, data: null, size: 0 }, 'quituple byte, fifth byte missing')
  t.deepEquals(read(255, 128, 130, 131, 1), { works: true, data: 274759807, size: 5 }, 'quituple byte, 274759807')
  t.deepEquals(read(255, 255, 255, 255, 255), { works: true, data: 4294967295, size: 6 }, 'quituple byte, max value = 4294967295')
  t.deepEquals(read(255, 128, 130, 131, 255, 1), { works: true, data: 4032856191, size: 6 }, 'additional bytes ignored')
})
