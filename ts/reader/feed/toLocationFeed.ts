import { IFeed } from './IFeed'
import { ILocationFeed } from './ILocationFeed'
import { IFeedRange } from './IFeedRange'

export function toLocationFeed (feed: IFeed, location: string): ILocationFeed {
  return {
    location,
    feed,
    createReadStream: range => feed.createReadStream(location, range)
  }
}
