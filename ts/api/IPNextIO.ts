import ITreeQuery from './ITreeQuery'
import ITree from './ITree'
import INodeQuery from './INodeQuery'
import IPointQuery from './IPointQuery'
import INode from './INode'
import INodeWithTree from './INodeWithTree'
import { IReadable } from './IReadable'
import { IDuplex } from './IDuplex'
import IPoint from './IPoint'
import IPointData from './IPointData'

export default interface IPNextIO<
  Tree extends ITree,
  Node extends INode,
  Point extends IPoint = IPoint
> {
  /**
   * Information about a list of trees given in the source
   */
  getTrees (query?: ITreeQuery, byos?: IDuplex<Tree>): IReadable<Tree>,

  /**
   * Information about a single tree given in the source
   *
   * (Convenience wrapper)
   */
  getTree (id: string, metadataProperties?: string[]): PromiseLike<Tree>,

  /**
   * Query for a set of nodes based on the camera position
   */
  getNodes (query?: INodeQuery, byos?: IDuplex<INode>): IReadable<Node>,

  /**
   * Query for a set nof nodes with the trees already added as reference
   */
  getNodesWithTrees (query?: INodeQuery, byos?: IDuplex<INodeWithTree<Node, Tree>>): IReadable<INodeWithTree<Node, Tree>>,

  /**
   * Requesting the actual node data from the server.
   */
  getPoints (query?: IPointQuery, byos?: IDuplex<IPointData<Point, Node>>): IReadable<IPointData<Point, Node>>
}
