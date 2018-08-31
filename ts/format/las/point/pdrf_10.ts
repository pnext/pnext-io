import { pdrf8Parts } from './pdrf_8'
import { extended } from './pdrf_4'
import readerForReaders from '../../../reader/readerForReaders'
import flattenReader from '../../../reader/util/flatReader'

export default flattenReader(readerForReaders(
  pdrf8Parts
    .concat(extended)
))
