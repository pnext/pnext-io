import INode from '../api/INode'
import IPoint from '../api/IPoint'
import IPointData from '../api/IPointData'
import ITree from '../api/ITree'
import IReader from '../reader/IReader'
import { IFeed } from '../reader/feed/IFeed'
import { ILocationRange } from '../reader/feed/ILocationRange'
import { readFromStream, ParseReader } from '../reader/readFromStream'
import { AbstractVirtualNodesIO, INodeLimit, IRange, RangeMap } from './AbstractVirtualNodesIO'
import IDynamicContext from '../reader/util/IDynamicContext'

export interface IStreamRange<Point extends IPoint> extends ILocationRange {
  reader: ParseReader<Point>
}

export type StreamRangeMap<Point extends IPoint> = { [nodeId: string]: IStreamRange<Point> }

export abstract class AbstractStreamIO<
  Tree extends ITree & INodeLimit,
  Point extends IPoint = IPoint
> extends AbstractVirtualNodesIO<Tree, Point> {

  sectionsP: PromiseLike<{ [nodeId: string]: IStreamRange<Point> }>
  feed: IFeed

  constructor (feed: IFeed, treeP: PromiseLike<Tree>) {
    super(treeP)
    this.feed = feed
    this.sectionsP = Promise.all([this.rangesAndNodesP, treeP]).then(
      ([{ ranges, nodes }, tree]) => this._prepareSections(tree, nodes, ranges)
    )
  }

  async _getPoints (node: INode, tree: Tree): Promise<IPointData<Point, INode>> {
    const section = (await this.sectionsP)[node.id]
    const points = readFromStream(this.feed.createReadStream(section.location, section), section.reader)
    return { node, points }
  }

  _getRangePoints (node: INode, range: IRange) {
    return Promise.reject(new Error('Not required in virtual nodes id'))
  }

  abstract _prepareSections (tree: Tree, nodes: INode[], ranges: RangeMap): PromiseLike<StreamRangeMap<Point>>
}
