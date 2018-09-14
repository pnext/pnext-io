import { pdrf8Parts } from './pdrf_8'
import { extended } from './pdrf_4'
import readerForReaders from '../../../reader/readerForReaders'
import IPoint from '../../../api/IPoint'

export default readerForReaders<IPoint>(
  pdrf8Parts
    .concat(extended)
)
