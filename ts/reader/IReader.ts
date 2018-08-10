import IDynamicResult from './IDynamicResult'

export default interface IReader {
  fixedSize: boolean
  size?: number
  minSize: number
  readDynamic (view: DataView, byteOffset): IDynamicResult
  read (view: DataView, byteOffset: number): any
}

export function createFixedReader (size: number, read: (view: DataView, byteOffset: number) => any): IReader {
  return {
    fixedSize: true,
    minSize: size,
    size,
    readDynamic: (view: DataView, byteOffset: number): IDynamicResult => ({
      size,
      byteOffset: byteOffset + size,
      data: read(view, byteOffset)
    }),
    read
  }
}

export function createDynamicReader (minSize: number, readDynamic: (view: DataView, byteOffset: number) => IDynamicResult): IReader {
  return {
    fixedSize: false,
    readDynamic,
    minSize,
    read: (view: DataView, byteOffset: number) => readDynamic(view, byteOffset).data
  }
}
