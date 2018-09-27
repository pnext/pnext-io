import IDynamicContext from './IDynamicContext'
import IReader, { DEFAULT_FIELD } from '../IReader'
import FeatureType from '../../api/FeatureType'
import IFeature from '../../api/IFeature'
import { createWorkContext } from './createWorkContext'

const workerContext = createWorkContext()

export function createDynamicSimpleReader<T> (
  minSize: number,
  type: FeatureType,
  readDynamic: (view: DataView, context: IDynamicContext) => boolean
): IReader<T, FeatureType> {
  const read = (view: DataView, byteOffset: number) => {
    workerContext.byteOffset = byteOffset
    workerContext.data = undefined
    readDynamic(view, workerContext)
    return workerContext.data
  }
  return {
    fixedSize: false,
    minSize,
    type,
    readDynamicTo (view: DataView, context: IDynamicContext, target: { [key: string]: any }) {
      if (readDynamic(view, context)) {
        target[DEFAULT_FIELD] = context.data
        context.data = target
        return true
      }
      return false
    },
    readDynamic,
    readTo (view: DataView, byteOffset: number, target: { [key: string]: any }) {
      target[DEFAULT_FIELD] = read(view, byteOffset)
    },
    read
  }
}

export function createDynamicObjectReader <T extends { [key: string]: any } = { [key: string]: any }> (
  minSize: number,
  type: { [key: string]: FeatureType },
  readDynamicTo: (view: DataView, context: IDynamicContext, target: { [key: string]: any }) => boolean
): IReader<T, { [key: string]: FeatureType }> {
  const readTo = (view: DataView, byteOffset: number, target: { [key: string]: any }) => {
    workerContext.byteOffset = byteOffset
    workerContext.data = undefined
    readDynamicTo(view, workerContext, target)
    return workerContext.data
  }
  return {
    fixedSize: false,
    minSize,
    type,
    readDynamicTo,
    readDynamic: (view: DataView, context: IDynamicContext) => readDynamicTo(view, context, {}),
    readTo,
    read: (view: DataView, byteOffset: number) => readTo(view, byteOffset, {})
  }
}
