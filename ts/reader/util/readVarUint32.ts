import readVarInt from './readVarInt'
import IDynamicContext from './IDynamicContext'

export default function readVarUint32 (view: DataView, context: IDynamicContext) {
  if (!readVarInt(view, context)) {
    return false
  }
  if (context.size === 6) {
    throw new Error('Invalid int-32 encoding!')
  }
  return true
}
