import IReader from '../IReader'
import IDynamicContext from './IDynamicContext'
import FeatureType from '../../api/FeatureType'
import { createWorkContext } from './createWorkContext'
import { createDynamicSimpleReader, createDynamicObjectReader } from './createDynamicReader'

const contextA = createWorkContext()
const contextB = createWorkContext()

function readPartB <B> (partB: IReader<B>, view: DataView, context: IDynamicContext) {
  const minSize = contextA.byteOffset + partB.minSize
  if (minSize > view.byteLength) {
    return false
  }
  if (partB.fixedSize) {
    context.data = partB.read(view, contextA.byteOffset)
    context.size = contextA.size + partB.minSize
    context.byteOffset = contextA.byteOffset + partB.minSize
  } else {
    contextB.from(contextA)
    if (!partB.readDynamic(view, contextB)) {
      return false
    }
    contextB.to(context)
    context.size += contextA.size
  }
  return true
}

function fixedSizeImpl <A, B, T> (partA: IReader<A>, template: (readerResult: A) => IReader<B>) {
  return (view: DataView, context: IDynamicContext) => {
    const afterPartA = view.byteOffset + partA.minSize
    contextA.data = partA.read(view, context.byteOffset)
    contextA.byteOffset = context.byteOffset + partA.minSize
    contextA.size = partA.minSize
    return readPartB(template(contextA.data), view, context)
  }
}

function dynamicImpl <A, B, T> (partA: IReader<A>, template: (readerResult: A) => IReader<B>) {
  return (view: DataView, context: IDynamicContext) => {
    contextA.byteOffset = context.byteOffset
    if (!partA.readDynamic(view, contextA)) {
      return false
    }
    return readPartB(template(contextA.data), view, context)
  }
}

function getReaderImpl <A, B, T> (partA: IReader<A>, template: (readerResult: A) => IReader<B>, type: T) {
  if (partA.fixedSize) {
    return fixedSizeImpl<A, B, T>(partA, template)
  }
  return dynamicImpl<A, B, T>(partA, template)
}

export function twoPartSimpleReader <A, B> (
  partA: IReader<A>,
  template: (readerResult: A) => IReader<B, FeatureType>,
  type: FeatureType
): IReader<B, FeatureType> {
  return createDynamicSimpleReader<B>(
    partA.minSize,
    type,
    getReaderImpl<A, B, FeatureType>(partA, template, type)
  )
}

export function twoPartObjectReader <A, B> (
  partA: IReader<A>,
  template: (readerResult: A) => IReader<B>,
  type: { [key: string]: FeatureType }
): IReader<B, { [key: string]: FeatureType }> {

  return createDynamicObjectReader<B>(
    partA.minSize,
    type,
    getReaderImpl<A, B, { [key: string]: FeatureType }>(partA, template, type)
  )
}
