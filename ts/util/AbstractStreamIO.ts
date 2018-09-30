import INode from '../api/INode'
import IPoint from '../api/IPoint'
import IPointData from '../api/IPointData'
import ITree from '../api/ITree'
import IReader from '../reader/IReader'
import { IFeed } from '../reader/feed/IFeed'
import { ILocationRange } from '../reader/feed/ILocationRange'
import { readFromStream, ParseReader } from '../reader/readFromStream'
import AbstractVirtualNodesIO, { INodeLimit, IRange } from './AbstractVirtualNodesIO'
import IDynamicContext from '../reader/util/IDynamicContext'

export interface IStreamRange<Point extends IPoint> extends ILocationRange {
  reader: ParseReader<Point>
}

export default abstract class AbstractStreamIO<
  Tree extends ITree & INodeLimit,
  Point extends IPoint = IPoint
> extends AbstractVirtualNodesIO<Tree, Point> {

  sectionsP: PromiseLike<{ [nodeId: string]: IStreamRange<Point> }>
  feed: IFeed

  constructor (feed: IFeed, treeP: PromiseLike<Tree>) {
    super(treeP)
    this.feed = feed
    this.sectionsP = Promise.all([this.rangesAndNodesP, treeP]).then(([{ ranges, nodes }, tree]) => this._prepareSections(tree, nodes, ranges))
  }

  async _getPoints (node: INode, tree: Tree): Promise<IPointData<Point>> {
    const section = (await this.sectionsP)[node.id]
    const points = readFromStream(this.feed.createReadStream(section.location, section), section.reader)
    return {
      node,
      points
    }
  }

  abstract _prepareSections (tree: Tree, nodes: INode[], ranges: { [nodeId: string]: IRange }): PromiseLike<{ [nodeId: string]: IStreamRange<Point> }>
}