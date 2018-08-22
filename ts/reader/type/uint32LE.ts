import createFixedReader from '../util/createFixedReader'

export default createFixedReader(4, (view: DataView, byteOffset: number) => view.getUint32(byteOffset, true))
