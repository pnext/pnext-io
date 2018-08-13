import IDynamicContext from './IDynamicContext'

export default interface IReader {
  fixedSize: boolean
  minSize: number
  readDynamic (view: DataView, context: IDynamicContext): boolean
  read (view: DataView, byteOffset: number): any
}

export function createFixedReader (size: number, read: (view: DataView, byteOffset: number) => any): IReader {
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

const helperContext: IDynamicContext = {
  data: null,
  byteOffset: 0,
  size: 0
}

export function createDynamicReader (minSize: number, readDynamic: (view: DataView, context: IDynamicContext) => boolean): IReader {
  return {
    fixedSize: false,
    readDynamic,
    minSize,
    read: (view: DataView, byteOffset: number) => {
      helperContext.byteOffset = byteOffset
      helperContext.data = undefined
      readDynamic(view, helperContext)
      return helperContext.data
    }
  }
}
