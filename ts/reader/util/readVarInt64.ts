import IDynamicContext from './IDynamicContext'
import readVarInt from './readVarInt'
import Long from 'long'

export default function readVarInt64 (unsigned: boolean, view: DataView, context: IDynamicContext) {
  const prevByteOffset = context.byteOffset
  if (!readVarInt(view, context)) {
    return false
  }
  const low: number = context.data
  if (context.size !== 6) {
    if (!unsigned) context.data = low | 0
    return true
  }
  if (!readVarInt(view, context)) {
    // the context was written, but still, lets reduce the byteOffset again
    context.byteOffset = prevByteOffset
    return false
  }
  if (context.size === 6) {
    throw new Error('Invalid var-int 64 encoding!')
  }
  context.data = new Long(low, context.data, unsigned)
  context.size = context.size + 5
  return true
}
