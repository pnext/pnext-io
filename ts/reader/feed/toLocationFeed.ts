import { IFeed } from './IFeed'
import { ILocationFeed } from './ILocationFeed'
import { IFeedRange } from './IFeedRange'

export function toLocationFeed (stream: IFeed, location: string): ILocationFeed {
  return {
    createReadStream: range => stream.createReadStream(location, range)
  }
}
