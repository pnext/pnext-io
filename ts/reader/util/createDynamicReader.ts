import IDynamicContext from './IDynamicContext'
import IReader, { DEFAULT_FIELD } from '../IReader'
import FeatureType from '../../api/FeatureType'
import IFeature from '../../api/IFeature'

const helperContext: IDynamicContext = {
  data: null,
  byteOffset: 0,
  size: 0
}

export function createDynamicSimpleReader<T> (
  minSize: number,
  type: FeatureType,
  readDynamic: (view: DataView, context: IDynamicContext) => boolean
): IReader<T> {
  const read = (view: DataView, byteOffset: number) => {
    helperContext.byteOffset = byteOffset
    helperContext.data = undefined
    readDynamic(view, helperContext)
    return helperContext.data
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

export function createDynamicObjectReader (
  minSize: number,
  type: { [key: string]: FeatureType },
  readDynamicTo: (view: DataView, context: IDynamicContext, target: { [key: string]: any }) => boolean
): IReader<{ [key: string]: any }> {
  const readTo = (view: DataView, byteOffset: number, target: { [key: string]: any }) => {
    helperContext.byteOffset = byteOffset
    helperContext.data = undefined
    readDynamicTo(view, helperContext, target)
    return helperContext.data
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

export default function createDynamicReader <T> (
  minSize: number,
  type: FeatureType | { [key: string]: FeatureType },
  readDynamic: (view: DataView, context: IDynamicContext, target?: { [key: string]: any }) => boolean
): IReader<any> {
  if (typeof type === 'object') {
    return createDynamicObjectReader(minSize, type, readDynamic)
  }
  return createDynamicSimpleReader(minSize, type, readDynamic)
}
