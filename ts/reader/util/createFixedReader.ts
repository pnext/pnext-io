import IDynamicContext from './IDynamicContext'
import IReader from '../IReader'

export default function createFixedReader (size: number, read: (view: DataView, byteOffset: number) => any): IReader {
  return {
    fixedSize: true,
    minSize: size,
    readDynamic: (view: DataView, context: IDynamicContext) => {
      const offset = context.byteOffset
      context.data = read(view, offset)
      context.byteOffset = offset + size
      context.size = size
      return true
    },
    read
  }
}
