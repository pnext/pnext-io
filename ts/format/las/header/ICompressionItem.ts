import { CompressionType } from './CompressionType'

export interface ICompressionItem {
  type: CompressionType,
  size: number,
  version: number
}
