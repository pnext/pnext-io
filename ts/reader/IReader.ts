import IDynamicContext from './util/IDynamicContext'
import IFeature from '../api/IFeature'
import FeatureType from '../api/FeatureType'

export default interface IReader {
  fixedSize: boolean
  minSize: number
  type: FeatureType | IFeature[]
  readDynamic (view: DataView, context: IDynamicContext): boolean
  read (view: DataView, byteOffset: number): any
}
