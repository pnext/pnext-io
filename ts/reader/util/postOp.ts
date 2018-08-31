import IReader from '../IReader'
import createFixedReader from './createFixedReader'
import createDynamicReader from './createDynamicReader'
import IDynamicContext from './IDynamicContext'
import FeatureType from '../../api/FeatureType'
import IFeature from '../../api/IFeature'

export function createDynamicPostOp (reader: IReader, type: FeatureType | IFeature[], op: (data: any) => any): IReader {
  return createDynamicReader(reader.minSize, type, (view: DataView, context: IDynamicContext) => {
    const result = reader.readDynamic(view, context)
    if (!result) {
      return false
    }
    context.data = op(context.data)
    return true
  })
}

export function createFixedPostOp (reader: IReader, type: FeatureType | IFeature[], op: (data: any) => any): IReader {
  return createFixedReader(reader.minSize, type, (view: DataView, byteOffset: number) => op(reader.read(view, byteOffset)))
}

export default function postOp (reader: IReader, type: FeatureType | IFeature[], op: (data: any) => any): IReader {
  if (reader.fixedSize) {
    return createFixedPostOp(reader, type, op)
  }
  return createDynamicPostOp(reader, type, op)
}
