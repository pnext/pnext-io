import INode from '../../api/INode'
import IPoint from '../../api/IPoint'
import { ILocationFeed } from '../../reader/feed/ILocationFeed'
import { AbstractStreamIO, StreamRangeMap } from '../../util/AbstractStreamIO'
import { RangeMap } from '../../util/AbstractVirtualNodesIO'
import { add, assertNumber, mul } from '../../util/long'
import { ILasTree } from './header/ILasTree'
import { readTree } from './header/readTree'

export class Las extends AbstractStreamIO<ILasTree, IPoint> {

  location: string

  constructor (feed: ILocationFeed, nodeLimit?: number) {
    super(feed.feed, readTree(feed, nodeLimit))
    this.location = feed.location
  }

  async _prepareSections (tree: ILasTree, nodes: INode[], ranges: RangeMap) {
    const map: StreamRangeMap<IPoint> = {}
    const reader = tree.pointReader
    for (const node of nodes) {
      const range = ranges[node.id]
      const start = assertNumber(add(tree.pointOffset, mul(range.start, reader.minSize)))
      const end = start + node.numPoints * reader.minSize
      map[node.id] = {
        location: this.location,
        reader,
        start,
        end
      }
    }
    return map
  }
}
