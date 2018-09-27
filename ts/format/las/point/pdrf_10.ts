import { pdrf8Parts } from './pdrf_8'
import { extended } from './pdrf_4'
import { INamedReader, readerForFixedFeatures } from '../../../reader/readerForReaders'
import IPoint from '../../../api/IPoint'

export default readerForFixedFeatures<IPoint>(
  pdrf8Parts
    .concat(extended)
)
