import IDynamicContext from './util/IDynamicContext'
import IFeature from '../api/IFeature'
import FeatureType from '../api/FeatureType'

export const DEFAULT_FIELD = 'IReader.default_field'

export default interface IReader<T> {
  fixedSize: boolean
  minSize: number
  type: FeatureType | { [key: string]: FeatureType }
  readDynamicTo (view: DataView, context: IDynamicContext, target: { [key: string]: any }): boolean
  readDynamic (view: DataView, context: IDynamicContext): boolean
  readTo (view: DataView, byteOffset: number, target: { [key: string]: any }): void
  read (view: DataView, byteOffset: number): T
}
