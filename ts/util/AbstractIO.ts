import ITree from '../api/ITree'
import ITreeQuery from '../api/ITreeQuery'
import Stream, { ReadableStream, Writable, WritableStream } from 'ts-stream'
import INode from '../api/INode'
import INodeWithTree from '../api/INodeWithTree'
import INodeQuery from '../api/INodeQuery'
import IPNextIO from '../api/IPNextIO'
import IPointQuery from '../api/IPointQuery'

export default abstract class AbstractIO implements IPNextIO {

  constructor () {
    // TODO: The trees are fetched every time again
    //       Adding a lru-cache that keeps trees to a
    //       certain amount would allow quicker node
    //       requests
  }

  abstract _getTrees (output: Stream<ITree>, query?: ITreeQuery): void
  abstract _getNodes (output: Stream<INode>, query?: INodeQuery): void
  abstract _getPoints (output: Stream<{ [k: string]: any; }>, query?: IPointQuery): void

  getTrees (query?: ITreeQuery, byos: Stream<ITree> = new Stream<ITree>()): ReadableStream<ITree> {
    this._getTrees(byos, query)
    return byos
  }

  getNodes (query?: INodeQuery, byos: Stream<INode> = new Stream<INode>()): ReadableStream<INode> {
    this._getNodes(byos, query)
    return byos
  }

  getPoints (query?: IPointQuery, byos: Stream<{ [k: string]: any; }> = new Stream<{ [k: string]: any; }>()): ReadableStream<{ [k: string]: any; }> {
    this._getPoints(byos, query)
    return byos
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
