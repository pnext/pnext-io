import IFeature from '../api/IFeature'
import INode from '../api/INode'
import INodeSelector from '../api/INodeSelector'
import INodeWithTree from '../api/INodeWithTree'
import IPNextIO from '../api/IPNextIO'
import IPointQuery from '../api/IPointQuery'
import ITree from '../api/ITree'
import { OctRegistry } from '../api/Oct'

interface ITrees {
  [treeId: string]: {
    ids: { [nodeId: string]: boolean },
    addresses: OctRegistry
  }
}

type ProcessPointQuery<Node extends INode, Tree extends ITree> =
  (node: INodeWithTree<Node, Tree>) => boolean | null

export function filterForQuery<
  Tree extends ITree,
  Node extends INode
> (query: IPointQuery): ProcessPointQuery<Node, Tree> {
  if (query === null || query === undefined || !Array.isArray(query.nodes)) {
    return null
  }
  let currentTreeId: string = null
  const trees: ITrees = query.nodes.reduce((trees: ITrees, node) => {
    if (node.treeId) {
      currentTreeId = node.treeId
    } else if (currentTreeId === null) {
      throw new Error('The first node arrived without a treeId!')
    }
    let tree = trees[currentTreeId]
    if (!tree) {
      tree = { ids: {}, addresses: new OctRegistry() }
      trees[currentTreeId] = tree
    }
    tree.ids[node.id || null] = true
    tree.addresses.registerAddress(node.address)
    return trees
  }, {})
  return (tuple: INodeWithTree<Node, Tree>) => {
    const tree = trees[tuple.tree.id]
    if (!tree) {
      return false
    }
    if (tree.ids[tuple.node.id]) {
      return true
    }
    if (tree.addresses.hasAddress(tuple.node.address)) {
      return true
    }
    return false
  }
}
