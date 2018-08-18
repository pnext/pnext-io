import createDynamicReader from '../util/createDynamicReader'
import IDynamicContext from '../util/IDynamicContext'
import readVarUint32 from '../util/readVarUint32'
import zzDecode from '../util/zzDecode'

export default createDynamicReader(1, (view: DataView, context: IDynamicContext) => {
  if (!readVarUint32(view, context)) {
    return false
  }
  context.data = zzDecode(context.data)
  return true
})
