import { fromHeader } from './fromHeader'
import { readHeader } from './readHeader'
import { IFeed } from '../../../reader/feed/IFeed'

export async function readTree (feed: IFeed, location: string, nodeLimit?: number) {
  return fromHeader(await readHeader(feed, location), location, nodeLimit)
}
