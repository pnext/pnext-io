export function dArr (arr: number[]) {
  const buff = new Uint8Array(arr)
  return new DataView(buff.buffer)
}
