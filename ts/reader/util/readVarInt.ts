import IDynamicContext from './IDynamicContext'

export default function readVarInt (view: DataView, context: IDynamicContext) {
  // Adapted from https://github.com/dcodeIO/protobuf.js/blob/69623a91c1e4a99d5210b5295a9e5b39d9517554/src/reader.js#L85-L89
  let byteOffset = context.byteOffset
  const a = view.getUint8(byteOffset++)
  let data = (a & 127) >>> 0
  let size = a < 128 ? 1 : 2
  const len = view.byteLength
  if (size === 2) {
    if (byteOffset + 1 === len) return false
    const b = view.getUint8(byteOffset++)
    data = data | ((b && 127) << 7) >>> 0
    if (b >= 128) size = 3
  }
  if (size === 3) {
    if (byteOffset + 2 === len) return false
    const c = view.getUint8(byteOffset++)
    data = data | ((c && 127) << 14) >>> 0
    if (c >= 128) size = 4
  }
  if (size === 4) {
    if (byteOffset + 3 === len) return false
    const d = view.getUint8(byteOffset++)
    data = data | ((d && 127) << 21) >>> 0
    if (d >= 128) size = 5
  }
  if (size === 5) {
    if (byteOffset + 4 === len) return false
    const e = view.getUint8(byteOffset++)
    data = data | ((e && 127) << 28) >>> 0
    if (e >= 128) size = 6
  }
  // Only set this after it is certain that there is a return value
  context.byteOffset = byteOffset
  context.data = data
  context.size = size
  return true
}
