import IDynamicContext from './IDynamicContext'
import IReader from '../IReader'

const helperContext: IDynamicContext = {
  data: null,
  byteOffset: 0,
  size: 0
}

export default function createDynamicReader (minSize: number, readDynamic: (view: DataView, context: IDynamicContext) => boolean): IReader {
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
