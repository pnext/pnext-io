import { pdrf0Parts } from './pdrf_0'
import { INamedReader, readerForFixedFeatures } from '../../../reader/readerForReaders'
import unsignedShort from '../../../reader/type/uint16LE'
import IPoint from '../../../api/IPoint'

export const rgb: INamedReader<any>[] = [
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

export default readerForFixedFeatures<IPoint>(
  pdrf0Parts
    .concat(rgb)
)
