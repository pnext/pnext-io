import INodeSelector from './INodeSelector'
import IBox3 from './IBox3'

export default interface INode extends INodeSelector {
  readonly numPoints: (number | Long)
  readonly bounds?: IBox3
}
