import { pdrf6Parts } from './pdrf_6'
import { rgb } from './pdrf_2'
import { INamedReader, readerForFixedFeatures } from '../../../reader/readerForReaders'
import IPoint from '../../../api/IPoint'

export const pdrf7Parts: INamedReader[] =
  pdrf6Parts
    .concat(rgb)

export default readerForFixedFeatures<IPoint>(
  pdrf7Parts
)
