import { pdrf6Parts } from './pdrf_6'
import { extended } from './pdrf_4'
import { readerForFixedFeatures } from '../../../reader/readerForReaders'
import IPoint from '../../../api/IPoint'

export default readerForFixedFeatures<IPoint>(
  pdrf6Parts
    .concat(extended)
)
