import { IFeed } from './IFeed'
import { ILocationFeed } from './ILocationFeed'

export function toLocationFeed (feed: IFeed, location: string): ILocationFeed {
  return {
    location,
    feed,
    createReadStream: range => feed.createReadStream(location, range)
  }
}
