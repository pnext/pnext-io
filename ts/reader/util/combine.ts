export function combine (arr: Uint8Array[]) {
  const combined = new Uint8Array(arr.reduce((total, chunk) => total + chunk.length, 0))
  let offset = 0
  for (const chunk of arr) {
    combined.set(chunk, offset)
    offset += chunk.length
  }
  return combined
}
