import { createDynamicSimpleReader } from '../util/createDynamicReader'
import IDynamicContext from '../util/IDynamicContext'
import readVarUint32 from '../util/readVarUint32'
import zzDecode from '../util/zzDecode'
import FeatureType from '../../api/FeatureType'

export default createDynamicSimpleReader<number>(1, FeatureType.int32, (view: DataView, context: IDynamicContext) => {
  if (!readVarUint32(view, context)) {
    return false
  }
  context.data = zzDecode(context.data)
  return true
})
