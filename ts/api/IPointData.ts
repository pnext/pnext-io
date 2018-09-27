import IPoint from './IPoint'
import INodeSelector from './INodeSelector'
import { IReadable } from './IReadable'

export default interface IPointData<Point extends IPoint> {
  node: INodeSelector
  points: IReadable<Point>
}
