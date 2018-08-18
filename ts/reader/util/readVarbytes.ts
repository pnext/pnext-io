import readVarUint32 from './readVarUint32'
import readBytesBase from './readBytesBase'
import IDynamicContext from './IDynamicContext'

export default function readVarbytes (view: DataView, context: IDynamicContext) {
  if (!readVarUint32(view, context)) {
    return false
  }
  return readBytesBase(context.data, context.size, view, context)
}
