import { pdrf7Parts } from './pdrf_7'
import readerForReaders, { INamedReader } from '../../../reader/readerForReaders'
import unsignedShort from '../../../reader/type/uint16LE'

/*
  The NIR (near infrared) channel value associated with this point.
*/
export const NIR = { reader: unsignedShort, name: 'NIR' }
export const pdrf8Parts: INamedReader[] =
  pdrf7Parts
    .concat(NIR)

export default readerForReaders(
  pdrf8Parts
)
