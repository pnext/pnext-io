import createFixedReader from '../util/createFixedReader'

export default createFixedReader(1, (view: DataView, byteOffset: number) => view.getUint8(byteOffset))
