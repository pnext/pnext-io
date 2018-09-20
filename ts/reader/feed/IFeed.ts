import { IFeedRange } from './IFeedRange'
import { ReadableStream } from 'ts-stream'

export interface IFeed {
  createReadStream (location: string, range: IFeedRange): ReadableStream<Uint8Array>
}
