import createDynamicReader from '../util/createDynamicReader'
import IDynamicContext from '../util/IDynamicContext'
import readBytesLE from '../util/readBytesLE'
import decodeUtf8Context from '../util/decodeUtf8Context'

export default createDynamicReader(5, (view: DataView, context: IDynamicContext) => readBytesLE(view, context) && decodeUtf8Context(context))
