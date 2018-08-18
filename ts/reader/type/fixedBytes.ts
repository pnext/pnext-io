import IReader from '../IReader'
import createFixedReader from '../util/createFixedReader'

export default function fixedBytesReader (length: number): IReader {
  if (isNaN(length)) {
    throw new Error(`A fixed string needs a length: ${length}`)
  }
  return createFixedReader(length, (view: DataView, byteOffset: number) => view.buffer.slice(byteOffset, byteOffset + length))
}
