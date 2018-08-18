import IDynamicContext from './IDynamicContext'
import readBytesBase from './readBytesBase'

export default function readBytes (view: DataView, context: IDynamicContext) {
  return readBytesBase(view.getUint32(context.byteOffset), 4, view, context)
}
