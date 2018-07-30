import INode from './INode'
import ITree from './ITree'

export default interface INodeWithTree extends INode {
  tree: ITree
}
