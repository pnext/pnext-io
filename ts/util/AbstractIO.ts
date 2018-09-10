import ITree from '../api/ITree'
import ITreeQuery from '../api/ITreeQuery'
import Stream, { ReadableStream, Writable, WritableStream } from 'ts-stream'
import INode from '../api/INode'
import INodeWithTree from '../api/INodeWithTree'
import INodeQuery from '../api/INodeQuery'
import IPNextIO from '../api/IPNextIO'
import IPointQuery from '../api/IPointQuery'
import IPoint from '../api/IPoint'
import IFeature from '../api/IFeature'
import INodeSelector from '../api/INodeSelector'
import Long from 'long'
import addTwoNumbers from './addToNumbers'
import Oct, { OctRegistry } from '../api/Oct'

export interface IStrictPointQuery {
  nodes: INodeWithTree[],
  start: number | Long,
  numPoints: number,
  schema?: IFeature[]
}

interface ITrees {
  [treeId: string]: {
    ids: { [nodeId: string]: boolean },
    addresses: OctRegistry
  }
}

function queryNodeFilter (nodes: INodeSelector[]): (node: INode) => boolean {
  const trees: ITrees = nodes.reduce((trees: ITrees, node) => {
    let tree = trees[node.treeId]
    if (!tree) {
      tree = { ids: {}, addresses: new OctRegistry() }
      trees[node.treeId] = tree
    }
    tree.ids[node.id || null] = true
    tree.addresses.registerAddress(node.address)
    return trees
  }, {})
  return (node: INode) => {
    const tree = trees[node.treeId]
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

export default abstract class AbstractIO implements IPNextIO {

  constructor () {
    // TODO: The trees are fetched every time again
    //       Adding a lru-cache that keeps trees to a
    //       certain amount would allow quicker node
    //       requests
  }

  abstract _getTrees (output: Stream<ITree>, query?: ITreeQuery): void
  abstract _getNodes (output: Stream<INode>, query?: INodeQuery): void
  abstract _getPoints (output: Stream<IPoint>, node: INode, start: number, numPoints: number): PromiseLike<void>

  getTrees (query?: ITreeQuery, byos: Stream<ITree> = new Stream<ITree>()): ReadableStream<ITree> {
    this._getTrees(byos, query)
    return byos
  }

  getNodes (query?: INodeQuery, byos: Stream<INode> = new Stream<INode>()): ReadableStream<INode> {
    this._getNodes(byos, query)
    return byos
  }

  getPoints (query?: IPointQuery, byos: Stream<IPoint> = new Stream<IPoint>()): ReadableStream<IPoint> {
    this.strictPointQuery(query)
      .then(async query => {
        let startLong = query.start
        let numPoints = query.numPoints
        if (numPoints === 0) {
          return
        }
        let start: number
        for (const node of query.nodes) {
          if (numPoints <= 0 && query.numPoints !== -1) {
            return
          }
          if (start === undefined) {
            if (typeof startLong === 'number') {
              start = startLong
            } else if (startLong.gt(node.numPoints)) {
              startLong = startLong.subtract(node.numPoints)
              continue // Next node
            } else {
              start = startLong.toNumber()
            }
          }
          if (start < node.numPoints) {
            const maxPoints = node.numPoints - start
            let nodePoints = query.numPoints === -1 ? node.numPoints : numPoints
            if (nodePoints > maxPoints) {
              nodePoints = maxPoints
            }
            await this._getPoints(byos, node, start, nodePoints)
            numPoints -= nodePoints
            start = 0
          } else {
            start -= node.numPoints
          }
        }
      })
      .then(() => byos.end())
      .catch(error => byos.end(error))
    return byos
  }

  async getTreesForNodes (nodes: INode[]): Promise<{ [id: string]: ITree }> {
    const treeIdMap = nodes.reduce((treeIdMap: { [treeId: string]: boolean } = {}, node) => {
      treeIdMap[node.treeId] = true
      return treeIdMap
    }, {})
    const ids = Object.keys(treeIdMap)
    const trees = await this.getTrees({ ids }).toArray()
    return ids.reduce((map: { [id: string]: ITree }, id, index) => {
      map[id] = trees[index]
      return map
    }, {})
  }

  async strictPointQuery (query?: IPointQuery): Promise<IStrictPointQuery> {
    if (!query) {
      query = {}
    }
    let nodes = (await this.getNodesWithTrees().toArray())
    if (query.nodes) {
      nodes = nodes.filter(queryNodeFilter(query.nodes))
    }
    const treeMap = await this.getTreesForNodes(nodes)
    const start = query.start || 0
    if (start < 0) {
      throw new Error(`Invalid query: start(${start}) needs to be bigger or equal 0`)
    }
    // Todo: make sure that you either throw an error or specify to ignore if
    //       a number greater than all points will only return up to max-points
    // Todo: Test all features in the schema!
    /*
      const error = featureMatch(tree.schema, query.schema)
      if (error) {
        return stream.end(new Error(error.map(error => error.message).join(';'))).catch(ignoreError)
      }
    */
    const numPoints = typeof query.numPoints === 'number'
      ? query.numPoints
      : Object.values(treeMap).reduce((totalPoints: number, tree) => {
        if (typeof tree.numPoints === 'number') {
          if (tree.numPoints <= Number.MAX_SAFE_INTEGER) {
            return totalPoints + tree.numPoints
          }
        } else if (tree.numPoints.lte(Number.MAX_SAFE_INTEGER)) {
          return totalPoints + tree.numPoints.toNumber()
        }
        return -1 // All points!
      }, 0)
    if (numPoints < -1) {
      throw new Error(`The number of points must be -1=all points, 0=no point or bigger 0`)
    }
    return {
      start,
      numPoints,
      nodes,
      schema: query.schema
    }
  }

  async getTree (id: string, metadataProperties?: string[]): Promise<ITree> {
    const trees = await this.getTrees({
      ids: [id],
      metadataProperties
    }).toArray()
    return trees[0]
  }

  getNodesWithTrees (query?: INodeQuery): ReadableStream<INodeWithTree> {
    const trees = {}
    let currentTreeId
    return this.getNodes(query)
      .map(async (node: INode) => {
        if (node.treeId) {
          currentTreeId = node.treeId
        }
        if (!currentTreeId) {
          throw new Error('The first node arrived without a treeId!')
        }
        if (!trees[currentTreeId]) {
          trees[currentTreeId] = this.getTree(currentTreeId)
        }
        return {
          ...node,
          tree: await trees[currentTreeId]
        }
      })
  }
}
