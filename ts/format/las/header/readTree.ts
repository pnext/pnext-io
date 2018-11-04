import { fromHeader } from './fromHeader'
import { readHeader } from './readHeader'
import { IFeed } from '../../../reader/feed/IFeed'

export async function readTree (feed: ILocationFeed, nodeLimit?: number) {
  return fromHeader(await readHeader(feed), location, nodeLimit)
}
