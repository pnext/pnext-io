import IReader from '../IReader'
import createFixedReader from './createFixedReader'
import createDynamicReader from './createDynamicReader'
import IDynamicContext from './IDynamicContext'
import FeatureType from '../../api/FeatureType'
import IFeature from '../../api/IFeature'

export function createDynamicPostOp<Before> (reader: IReader<Before>, type: FeatureType | { [key: string]: FeatureType }, op: (data: any) => any) {
  return createDynamicReader(reader.minSize, type, (view: DataView, context: IDynamicContext) => {
    const result = reader.readDynamic(view, context)
    if (!result) {
      return false
    }
    context.data = op(context.data)
    return true
  })
}

export function createFixedPostOp<Before> (reader: IReader<Before>, type: FeatureType | { [key: string]: FeatureType }, op: (data: any) => any) {
  return createFixedReader(reader.minSize, type, (view: DataView, byteOffset: number) => op(reader.read(view, byteOffset)))
}

export default function postOp<Before> (reader: IReader<Before>, type: FeatureType | { [key: string]: FeatureType }, op: (data: any) => any): IReader<any> {
  if (reader.fixedSize) {
    return createFixedPostOp<Before>(reader, type, op)
  }
  return createDynamicPostOp<Before>(reader, type, op)
}
