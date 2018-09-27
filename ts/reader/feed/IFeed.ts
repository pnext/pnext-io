import { IFeedRange } from './IFeedRange'
import { IReadable } from '../../api/IReadable'

export interface IFeed {
  createReadStream (location: string, range: IFeedRange): IReadable<Uint8Array>
}
