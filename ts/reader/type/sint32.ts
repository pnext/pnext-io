import createFixedReader from '../util/createFixedReader'

export default createFixedReader(4, (view: DataView, byteOffset: number) => view.getInt32(byteOffset) | 0)
