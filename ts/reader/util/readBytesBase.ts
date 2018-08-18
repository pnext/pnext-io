import IDynamicContext from './IDynamicContext'

export default function readBytesBase (size: number, sizeBytes: number, view: DataView, context: IDynamicContext) {
  const start = view.byteOffset + context.byteOffset + sizeBytes
  const end = start + size
  if (end >= view.buffer.byteLength) {
    return false
  }
  context.size = size + sizeBytes
  context.byteOffset = end
  context.data = view.buffer.slice(start, end)
  return true
}
