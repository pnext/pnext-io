import IDynamicContext from './IDynamicContext'
import IReader, { DEFAULT_FIELD } from '../IReader'
import FeatureType from '../../api/FeatureType'
import IFeature from '../../api/IFeature'

export function createFixedSimpleReader <T> (
  size: number,
  type: FeatureType,
  read: (view: DataView, byteOffset: number) => T
): IReader<T> {
  return {
    fixedSize: true,
    minSize: size,
    type,
    readDynamicTo (view: DataView, context: IDynamicContext, target: { [key: string]: any }) {
      const offset = context.byteOffset
      target[DEFAULT_FIELD] = read(view, offset)
      context.data = target
      context.byteOffset = offset + size
      context.size = size
      return true
    },
    readDynamic (view: DataView, context: IDynamicContext) {
      const offset = context.byteOffset
      context.data = read(view, offset)
      context.byteOffset = offset + size
      context.size = size
      return true
    },
    readTo (view: DataView, byteOffset: number, target: { [key: string]: any }) {
      target[DEFAULT_FIELD] = read(view, byteOffset)
    },
    read
  }
}

export function createFixedObjectReader (
  size: number,
  type: { [key: string]: FeatureType },
  readImpl: (view: DataView, byteOffset: number, target: { [key: string]: any }) => void
): IReader<{ [key: string]: any }> {
  const readDynamicTo = (view: DataView, context: IDynamicContext, target: { [key: string]: any }) => {
    readImpl(view, context.byteOffset, target)
    context.data = target
    context.byteOffset += size
    context.size = size
    return true
  }
  const readTo = (view: DataView, byteOffset: number, target: { [key: string]: any }) => {
    readImpl(view, byteOffset, target)
    return target
  }
  return {
    fixedSize: true,
    minSize: size,
    type,
    readDynamicTo,
    readDynamic: (view: DataView, context: IDynamicContext) => readDynamicTo(view, context, {}),
    readTo,
    read: (view: DataView, byteOffset: number) => readTo(view, byteOffset, {})
  }
}

export default function createFixedReader <T> (
  size: number,
  type: FeatureType | { [key: string]: FeatureType },
  read: (view: DataView, byteOffset: number, target?: { [key: string]: any }) => T
): IReader<any> {
  if (typeof type === 'object') {
    return createFixedObjectReader(size, type, read)
  }
  return createFixedSimpleReader<T>(size, type, read)
}
