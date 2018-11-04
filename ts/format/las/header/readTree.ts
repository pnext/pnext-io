import { ILocationFeed } from '../../../reader/feed/ILocationFeed'
import { fromHeader } from './fromHeader'
import { readHeader } from './readHeader'
import { readVarLenRecords } from './readVarLenRecords'

export async function readTree (feed: ILocationFeed, nodeLimit?: number) {
  const rawHeader = await readHeader(feed)
  const varLenRecords = await readVarLenRecords(feed, rawHeader)
  return fromHeader(rawHeader, varLenRecords, feed.location, nodeLimit)
}
