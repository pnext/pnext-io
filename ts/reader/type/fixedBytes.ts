import IReader from '../IReader'
import createFixedReader from '../util/createFixedReader'

export default function fixedBytes (length: number): IReader {
  if (length === 0) {
    return createFixedReader(0, (view: DataView, byteOffset: number) => new Uint8Array())
  }
  if (isNaN(length)) {
    throw new Error(`A fixed string needs a length: ${length}`)
  }
  return createFixedReader(length, (view: DataView, byteOffset: number) => view.buffer.slice(byteOffset, byteOffset + length))
}
