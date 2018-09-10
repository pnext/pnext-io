import INodeSelector from './INodeSelector'
import IBox3 from './IBox3'

export default interface INode extends INodeSelector {
  /**
   * Number of points inside this node. Unlike in ITree
   * the number inside a node can not be Long. This is
   * to reduce the operational complexity
   */
  readonly numPoints: number
  readonly bounds?: IBox3
}
