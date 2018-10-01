import INode from '../../api/INode'
import IPoint from '../../api/IPoint'
import IReader from '../../reader/IReader'
import readerByFormat from './point/readerByFormat'
import { ILocationFeed } from '../../reader/feed/ILocationFeed'
import { AbstractStreamIO, StreamRangeMap, IStreamRange } from '../../util/AbstractStreamIO'
import { RangeMap } from '../../util/AbstractVirtualNodesIO'
import { ILasTree } from './header/ILasTree'
import { IFeed } from '../../reader/feed/IFeed'
import { FeatureObject } from '../../api/FeatureType'
import { add, mul, assertNumber } from '../../util/long'
import { readTree } from './header/readTree'

export class Las extends AbstractStreamIO<ILasTree, IPoint> {

  location: string

  constructor (feed: IFeed, location: string, nodeLimit?: number) {
    super(feed, readTree(feed, location, nodeLimit))
    this.location = location
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
