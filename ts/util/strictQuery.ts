import IFeature from '../api/IFeature'
import INode from '../api/INode'
import INodeSelector from '../api/INodeSelector'
import INodeWithTree from '../api/INodeWithTree'
import IPNextIO from '../api/IPNextIO'
import IPointQuery from '../api/IPointQuery'
import ITree from '../api/ITree'
import { OctRegistry } from '../api/Oct'

export interface IStrictPointQuery {
  nodesWithTrees: INodeWithTree[],
  schema?: IFeature[]
}

interface ITrees {
  [treeId: string]: {
    ids: { [nodeId: string]: boolean },
    addresses: OctRegistry
  }
}

function queryNodeFilter (nodes: INodeSelector[]): (node: INode) => boolean {
  let currentTreeId: string = null
  const trees: ITrees = nodes.reduce((trees: ITrees, node) => {
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
  return (node: INodeWithTree) => {
    const tree = trees[node.tree.id]
    if (!tree) {
      return false
    }
    if (tree.ids[node.id]) {
      return true
    }
    if (tree.addresses.hasAddress(node.address)) {
      return true
    }
    return false
  }
}

export async function strictPointQuery (nodesWithTrees: INodeWithTree[], query?: IPointQuery): Promise<IStrictPointQuery> {
  if (!query) {
    query = {}
  }
  if (query.nodes) {
    nodesWithTrees = nodesWithTrees.filter(queryNodeFilter(query.nodes))
  }
  const treeMap = nodesWithTrees.reduce((treeIdMap: { [treeId: string]: ITree } = {}, node) => {
    treeIdMap[node.tree.id] = node.tree
    return treeIdMap
  }, {})
  // Todo: make sure that you either throw an error or specify to ignore if
  //       a number greater than all points will only return up to max-points
  // Todo: Test all features in the schema!
  /*
    const error = featureMatch(tree.schema, query.schema)
    if (error) {
      return stream.end(new Error(error.map(error => error.message).join(';'))).catch(ignoreError)
    }
  */
  return {
    nodesWithTrees,
    schema: query.schema
  }
}
