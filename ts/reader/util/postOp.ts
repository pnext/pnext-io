import IReader from '../IReader'
import { createFixedSimpleReader, createFixedObjectReader } from './createFixedReader'
import { createDynamicObjectReader, createDynamicSimpleReader } from './createDynamicReader'
import IDynamicContext from './IDynamicContext'
import FeatureType from '../../api/FeatureType'
import IFeature from '../../api/IFeature'
import { createWorkContext } from './createWorkContext'

export function postOpSimple<Before, After> (
  reader: IReader<Before, FeatureType>,
  type: FeatureType,
  op: (before: Before) => After
) {
  if (reader.fixedSize) {
    return createFixedSimpleReader(reader.minSize, type, (view: DataView, byteOffset: number) => op(reader.read(view, byteOffset)))
  }
  const workContext = createWorkContext()
  return createDynamicSimpleReader(reader.minSize, type, (view: DataView, context: IDynamicContext) => {
    workContext.from(context)
    if (reader.readDynamic(view, workContext)) {
      const data = context.data
      workContext.to(context)
      return true
    }
    return false
  })
}

export function postOpObject<Before, After> (
  reader: IReader<Before, { [key: string]: FeatureType }>,
  type: { [key: string]: FeatureType },
  op: (temp: Before, after: { [key: string]: any }) => void
) {
  const temp = {}
  if (reader.fixedSize) {
    return createFixedObjectReader(reader.minSize, type, (view: DataView, byteOffset: number, target: { [key: string]: any }) => {
      reader.readTo(view, byteOffset, temp)
      return op(temp as Before, target)
    })
  }
  const workContext = createWorkContext()
  return createDynamicObjectReader(reader.minSize, type, (view: DataView, context: IDynamicContext, target: { [key: string]: any }) => {
    workContext.from(context)
    if (reader.readDynamicTo(view, workContext, temp)) {
      op(temp as Before, target)
      workContext.to(context)
      return true
    }
    return false
  })
}
