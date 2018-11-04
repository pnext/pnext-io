import readerForReaders from '../../../reader/readerForReaders'
import unsignedShort from '../../../reader/type/uint16LE'
import unsignedLong from '../../../reader/type/uint32LE'
import unsignedLongLong from '../../../reader/type/uint64LE'
import unsignedChar from '../../../reader/type/uint8'
import { ICompression } from './ICompression'
import { ICompressionItem } from './ICompressionItem'

// https://github.com/LASzip/LASzip/blob/f86232e946abf823968ae2024c1124cb02c86d0e/src/laszip.cpp#L63-L77
export const compressionHeader = readerForReaders<ICompression>([
  { name: 'compressor', reader: unsignedShort },
  { name: 'coder', reader: unsignedShort },
  { name: 'versionMajor', reader: unsignedChar },
  { name: 'versionMinor', reader: unsignedChar },
  { name: 'revision', reader: unsignedShort },
  { name: 'options', reader: unsignedLong },
  { name: 'chunkSize', reader: unsignedLong },
  { name: 'numPoints', reader: unsignedLongLong },
  { name: 'numBytes', reader: unsignedLongLong },
  { name: 'numItems', reader: unsignedShort }
])

export const compressionItem = readerForReaders<ICompressionItem>([
  { name: 'type', reader: unsignedShort },
  { name: 'size', reader: unsignedShort },
  { name: 'version', reader: unsignedShort }
])
