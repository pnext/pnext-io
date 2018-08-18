import IDynamicContext from './IDynamicContext'
import readBytesBase from './readBytesBase'

export default function readBytesLE (view: DataView, context: IDynamicContext) {
  return readBytesBase(view.getUint32(context.byteOffset, true), 4, view, context)
}
