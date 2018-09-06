import { pdrf0Parts } from './pdrf_0'
import readerForReaders, { INamedReader } from '../../../reader/readerForReaders'
import postOp from '../../../reader/util/postOp'
import double from '../../../reader/type/double'

/*
  The GPS Time is the double floating point time tag value at which the point was acquired.
  It is GPS Week Time if the Global Encoding low bit is clear and Adjusted Standard GPS
  Time if the Global Encoding low bit is set (see Global Encoding in the Public Header
  Block description).
*/
export const gpsTime: INamedReader = { reader: double, name: 'GPS Time' }

export default readerForReaders(
  pdrf0Parts
    .concat(gpsTime)
)
