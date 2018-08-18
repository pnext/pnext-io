export default function zzDecodeLong (long: Long) {
  // Adapted from https://github.com/dcodeIO/protobuf.js/blob/69623a91c1e4a99d5210b5295a9e5b39d9517554/src/util/longbits.js#L176-L181
  const mask = -(long.low & 1)
  long.low = ((long.low >>> 1 | long.high << 31) ^ mask) >>> 0
  long.high = (long.high >>> 1 ^ mask) >>> 0
  return long
}
