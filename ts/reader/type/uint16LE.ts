import createFixedReader from '../util/createFixedReader'

export default createFixedReader(2, (view: DataView, byteOffset: number) => view.getUint16(byteOffset, true))
