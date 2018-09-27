import { IFeedRange } from './IFeedRange'
import { IReadable } from '../../api/IReadable'

export interface ILocationFeed {
  createReadStream (range: IFeedRange): IReadable<Uint8Array>
}
