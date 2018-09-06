import { pdrf6Parts } from './pdrf_6'
import { extended } from './pdrf_4'
import readerForReaders from '../../../reader/readerForReaders'

export default readerForReaders(
  pdrf6Parts
    .concat(extended)
)
