import createDynamicReader from '../util/createDynamicReader'
import IDynamicContext from '../util/IDynamicContext'
import readVarInt64 from '../util/readVarInt64'
import zzDecode from '../util/zzDecode'
import zzDecodeLong from '../util/zzDecodeLong'
import FeatureType from '../../api/FeatureType'

export default createDynamicReader(1, FeatureType.int64, (view: DataView, context: IDynamicContext) => {
  if (!readVarInt64(false, view, context)) {
    return false
  }
  if (typeof context.data === 'number') {
    context.data = zzDecode(context.data)
  } else {
    context.data = zzDecodeLong(context.data)
  }
  return true
})
