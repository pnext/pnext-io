import IDynamicContext from './util/IDynamicContext'

export default interface IReader {
  fixedSize: boolean
  minSize: number
  readDynamic (view: DataView, context: IDynamicContext): boolean
  read (view: DataView, byteOffset: number): any
}
