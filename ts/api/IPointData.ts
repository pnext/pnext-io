import IPoint from './IPoint'
import INodeSelector from './INodeSelector'

export default interface IPointData {
  node: INodeSelector
  points: IPoint[]
}
