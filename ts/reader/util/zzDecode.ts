export default function zzDecode (input: number) {
  // Adapted from https://github.com/dcodeIO/protobuf.js/blob/69623a91c1e4a99d5210b5295a9e5b39d9517554/src/reader.js#L113-L114
  return input >>> 1 ^ -(input & 1) | 0
}
