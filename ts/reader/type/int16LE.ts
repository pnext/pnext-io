import createFixedReader from '../util/createFixedReader'

export default createFixedReader(2, (view: DataView, byteOffset: number) => view.getInt16(byteOffset, true))
