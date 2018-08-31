import { pdrf8Parts } from './pdrf_8'
import { extended } from './pdrf_4'
import readerForReaders from '../../../reader/readerForReaders'
import flatReader from '../../../reader/util/flatReader'

export default flatReader(readerForReaders(
  pdrf8Parts
    .concat(extended)
))
