import INode from '../api/INode'
import ISphere from './ISphere'

export default interface INodeTree {
  node: INode,
  boundingSphere: ISphere,
  children: INodeTree[]
}
