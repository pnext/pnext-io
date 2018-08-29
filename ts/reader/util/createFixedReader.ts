import IDynamicContext from './IDynamicContext'
import IReader from '../IReader'
import FeatureType from '../../api/FeatureType'
import IFeature from '../../api/IFeature'

export default function createFixedReader (size: number, type: FeatureType | IFeature[], read: (view: DataView, byteOffset: number) => any): IReader {
  return {
    fixedSize: true,
    minSize: size,
    type,
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
