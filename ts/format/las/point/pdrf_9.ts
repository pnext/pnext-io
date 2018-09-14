import { pdrf6Parts } from './pdrf_6'
import { extended } from './pdrf_4'
import readerForReaders from '../../../reader/readerForReaders'
import IPoint from '../../../api/IPoint'

export default readerForReaders<IPoint>(
  pdrf6Parts
    .concat(extended)
)
