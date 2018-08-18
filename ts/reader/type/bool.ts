import createFixedReader from '../util/createFixedReader'

export default createFixedReader(1, (view: DataView, byteOffset: number) => view.getInt8(byteOffset) === 0)
