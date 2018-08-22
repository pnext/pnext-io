import createDynamicReader from '../util/createDynamicReader'
import IDynamicContext from '../util/IDynamicContext'
import readVarUint32 from '../util/readVarUint32'

export default createDynamicReader(1, (view: DataView, context: IDynamicContext) => {
  if (!readVarUint32(view, context)) {
    return false
  }
  context.data = context.data | 0
  return true
})
