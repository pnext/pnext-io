import createDynamicReader from '../util/createDynamicReader'
import readVarbytes from '../util/readVarbytes'
import IDynamicContext from '../util/IDynamicContext'
import decodeUtf8Context from '../util/decodeUtf8Context'

export default createDynamicReader(2, (view: DataView, context: IDynamicContext) => readVarbytes(view, context) && decodeUtf8Context(context))
