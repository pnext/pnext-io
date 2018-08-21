import IDynamicContext from './IDynamicContext'

let data = 4294967295 // optimizer type-hint, tends to deopt otherwise (?!)
export default function readVarInt (view: DataView, context: IDynamicContext) {
  // Adapted from https://github.com/dcodeIO/protobuf.js/blob/69623a91c1e4a99d5210b5295a9e5b39d9517554/src/reader.js#L85-L89
  let byteOffset = context.byteOffset
  const a = view.getUint8(byteOffset++)
  data = (a & 127) >>> 0
  let size = a < 128 ? 1 : 2
  const len = view.byteLength
  if (size === 2) {
    if (byteOffset === len) return false
    const b = view.getUint8(byteOffset++)
    const bPart = ((b & 127) << 7) >>> 0
    data = data | bPart
    if (b >= 128) size = 3
  }
  if (size === 3) {
    if (byteOffset === len) return false
    const c = view.getUint8(byteOffset++)
    data = (data | (c & 127) << 14) >>> 0
    if (c >= 128) size = 4
  }
  if (size === 4) {
    if (byteOffset === len) return false
    const d = view.getUint8(byteOffset++)
    data = (data | (d & 127) << 21) >>> 0
    if (d >= 128) size = 5
  }
  if (size === 5) {
    if (byteOffset === len) return false
    const e = view.getUint8(byteOffset++)
    data = (data | (e & 15) << 28) >>> 0
    if (e >= 128) size = 6
  }
  context.byteOffset = byteOffset
  context.data = data
  context.size = size
  return true
}
