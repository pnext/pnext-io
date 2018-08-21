import IReader from '../IReader'
import IDynamicContext from './IDynamicContext'
import createDynamicReader from './createDynamicReader'

const contextA: IDynamicContext = {
  data: null,
  size: 0,
  byteOffset: 0
}

const contextB: IDynamicContext = {
  data: null,
  size: 0,
  byteOffset: 0
}

function readPartB (partB: IReader, view: DataView, context: IDynamicContext) {
  const minSize = contextA.byteOffset + partB.minSize
  if (minSize > view.byteLength) {
    return false
  }
  if (partB.fixedSize) {
    context.data = partB.read(view, contextA.byteOffset)
    context.size = contextA.size + partB.minSize
    context.byteOffset = contextA.byteOffset + partB.minSize
  } else {
    contextB.byteOffset = contextA.byteOffset
    if (!partB.readDynamic(view, contextB)) {
      return false
    }
    context.size = contextA.size + contextB.size
    context.byteOffset = contextB.byteOffset
    context.data = contextB.data
  }
  return true
}

function twoPartFixedSizeReader (partA: IReader, template: (readerResult) => IReader) {
  return (view: DataView, context: IDynamicContext) => {
    const afterPartA = view.byteOffset + partA.minSize
    contextA.data = partA.read(view, context.byteOffset)
    contextA.byteOffset = context.byteOffset + partA.minSize
    contextA.size = partA.minSize
    return readPartB(template(contextA.data), view, context)
  }
}

function twoPartDynamicReader (partA: IReader, template: (readerResult) => IReader) {
  return (view: DataView, context: IDynamicContext) => {
    contextA.byteOffset = context.byteOffset
    if (!partA.readDynamic(view, contextA)) {
      return false
    }
    return readPartB(template(contextA.data), view, context)
  }
}

export default function twoPartReader (partA: IReader, template: (readerResult) => IReader) {
  return createDynamicReader(
    partA.minSize,
    partA.fixedSize
      ? twoPartFixedSizeReader(partA, template)
      : twoPartDynamicReader(partA, template)
  )
}
