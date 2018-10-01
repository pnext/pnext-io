import IPoint from './IPoint'
import INodeSelector from './INodeSelector'
import { IReadable } from './IReadable'

export default interface IPointData<Point extends IPoint, Node extends INodeSelector> {
  node: Node
  points: IReadable<Point>
}
