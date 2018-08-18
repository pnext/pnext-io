import createDynamicReader from '../util/createDynamicReader'
import IDynamicContext from '../util/IDynamicContext'
import readBytes from '../util/readBytes'
import decodeUtf8Context from '../util/decodeUtf8Context'

export default createDynamicReader(5, (view: DataView, context: IDynamicContext) => readBytes(view, context) && decodeUtf8Context(context))
