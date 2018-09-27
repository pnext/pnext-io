import INode from './INode'
import ITree from './ITree'

export default interface INodeWithTree <Node extends INode, Tree extends ITree> {
  node: Node,
  tree: Tree
}
