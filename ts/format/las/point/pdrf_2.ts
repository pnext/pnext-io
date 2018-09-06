import { pdrf0Parts } from './pdrf_0'
import readerForReaders from '../../../reader/readerForReaders'
import unsignedShort from '../../../reader/type/uint16LE'

export const rgb = [
  /*
    The Red, Green, Blue values should always be normalized to 16 bit values.
    For example, when encoding an 8 bit per channel pixel, multiply each channel
    value by 256 prior to storage in these fields. This normalization allows
    color values from different camera bit depths to be accurately merged.
  */
  { reader: unsignedShort, name: 'r' },
  { reader: unsignedShort, name: 'g' },
  { reader: unsignedShort, name: 'b' }
]

export default readerForReaders(
  pdrf0Parts
    .concat(rgb)
)
