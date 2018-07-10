import INodeQueryItem from './INodeQueryItem'

export default interface INode extends INodeQueryItem {
  readonly numPoints: (number | Long)
}
