import createFixedReader from '../util/createFixedReader'

export default createFixedReader(8, (view: DataView, byteOffset: number) => view.getFloat64(byteOffset))
