import { ILocationFeed } from '../../../reader/feed/ILocationFeed'
import { fromHeader } from './fromHeader'
import { readHeader } from './readHeader'

export async function readTree (feed: ILocationFeed, nodeLimit?: number) {
  return fromHeader(await readHeader(feed), location, nodeLimit)
}
