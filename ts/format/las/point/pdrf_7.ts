import { pdrf6Parts } from './pdrf_6'
import { rgb } from './pdrf_2'
import readerForReaders, { INamedReader } from '../../../reader/readerForReaders'
import flattenReader from '../../../reader/util/flatReader'

export const pdrf7Parts: INamedReader[] =
  pdrf6Parts
    .concat(rgb)

export default flattenReader(readerForReaders(
  pdrf7Parts
))
