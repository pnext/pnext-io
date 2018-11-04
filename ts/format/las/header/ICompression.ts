import { ICompressionItem } from './ICompressionItem'

export interface ICompression {
  compressor: number,
  coder: number,
  versionMajor: number,
  versionMinor: number,
  revision: number,
  options: number,
  chunkSize: number,
  numPoints: number | Long,
  numBytes: number | Long,
  numItems: number
  items?: ICompressionItem[] // To be added outside
}
