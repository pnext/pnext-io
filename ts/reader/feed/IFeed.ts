import { IFeedRange } from './IFeedRange'
import { IReadable } from '../../api/IReadable'
import { ILocationFeed } from './ILocationFeed'

export interface IFeed {
  createReadStream (location: string, range?: IFeedRange): IReadable<Uint8Array>
  createLocationFeed (location: string): ILocationFeed
}
