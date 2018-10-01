import { IFeedRange } from './IFeedRange'
import { IReadable } from '../../api/IReadable'
import { IFeed } from './IFeed'

export interface ILocationFeed {
  feed: IFeed
  location: string
  createReadStream (range: IFeedRange): IReadable<Uint8Array>
}
