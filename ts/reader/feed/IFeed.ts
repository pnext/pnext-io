import { IFeedRange } from './IFeedRange'
import { ReadableStream } from 'ts-stream'

export interface IFeed {
  createReadStream (range: IFeedRange): ReadableStream<Uint8Array>
  onIdle (): Promise<void>
}
