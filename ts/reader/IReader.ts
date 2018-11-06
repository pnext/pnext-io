import IDynamicContext from './util/IDynamicContext'
import FeatureType from '../api/FeatureType'

export const DEFAULT_FIELD = 'IReader.default_field'

export default interface IReader<Output, Type = FeatureType | { [key: string]: FeatureType }> {
  fixedSize: boolean
  minSize: number
  type: Type
  readDynamicTo (view: DataView, context: IDynamicContext, target: { [key: string]: any }): boolean
  readDynamic (view: DataView, context: IDynamicContext): boolean
  readTo (view: DataView, byteOffset: number, target: { [key: string]: any }): void
  read (view: DataView, byteOffset: number): Output
}
