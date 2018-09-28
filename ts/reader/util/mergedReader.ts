import IReader from '../IReader'
import IDynamicContext from './IDynamicContext'
import FeatureType from '../../api/FeatureType'
import { createWorkContext } from './createWorkContext'
import { createDynamicSimpleReader, createDynamicObjectReader } from './createDynamicReader'

const contextA = createWorkContext()
const contextB = createWorkContext()
type IFeatureType = { [key: string]: FeatureType }

function readPartB <B> (partB: IReader<B>, view: DataView, context: IDynamicContext, target: { [key: string]: any }) {
  const minSize = contextA.byteOffset + partB.minSize
  if (minSize > view.byteLength) {
    return false
  }
  if (partB.fixedSize) {
    context.data = partB.readTo(view, contextA.byteOffset, target)
    context.size = contextA.size + partB.minSize
    context.byteOffset = contextA.byteOffset + partB.minSize
  } else {
    contextB.from(contextA)
    if (!partB.readDynamicTo(view, contextB, target)) {
      return false
    }
    contextB.to(context)
    context.size += contextA.size
  }
  return true
}

function fixedSizeImpl <A> (partA: IReader<A>, template: (readerResult: A) => IReader<any, IFeatureType>) {
  return (view: DataView, context: IDynamicContext, target: { [key: string]: any }) => {
    const afterPartA = view.byteOffset + partA.minSize
    contextA.data = partA.readTo(view, context.byteOffset, target)
    contextA.byteOffset = context.byteOffset + partA.minSize
    contextA.size = partA.minSize
    const partB = template(contextA.data)
    if (partB === null || partB === undefined) {
      contextA.to(context)
      return true
    }
    return readPartB(partB, view, context, target)
  }
}

function dynamicImpl <A> (partA: IReader<A>, template: (readerResult: A) => IReader<any, IFeatureType>) {
  return (view: DataView, context: IDynamicContext, target: { [key: string]: any }) => {
    contextA.byteOffset = context.byteOffset
    if (!partA.readDynamicTo(view, contextA, target)) {
      return false
    }
    const partB = template(contextA.data)
    if (partB === null || partB === undefined) {
      contextA.to(context)
      return true
    }
    return readPartB(partB, view, context, target)
  }
}

function getReaderImpl <A> (partA: IReader<A>, template: (readerResult: A) => IReader<any, IFeatureType>, type: IFeatureType) {
  if (partA.fixedSize) {
    return fixedSizeImpl<A>(partA, template)
  }
  return dynamicImpl<A>(partA, template)
}

export function mergedReader <Out, A> (
  partA: IReader<A>,
  template: (readerResult: A) => IReader<any, IFeatureType>,
  type: { [key: string]: FeatureType }
): IReader<Out, { [key: string]: FeatureType }> {
  return createDynamicObjectReader<Out>(
    partA.minSize,
    type,
    getReaderImpl<A>(partA, template, type)
  )
}
