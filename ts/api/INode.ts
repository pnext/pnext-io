import INodeSelector from './INodeSelector'

export default interface INode extends INodeSelector {
  readonly numPoints: (number | Long)
}
