import ITree from '../api/ITree'
import ITreeQuery from '../api/ITreeQuery'
import { ReadableStream } from 'ts-stream'
import INode from '../api/INode'
import INodeWithTree from '../api/INodeWithTree'
import IPointQuery from '../api/IPointQuery'

export default class AbstractIO {

  constructor () {
    // TODO: The trees are fetched every time again
    //       Adding a lru-cache that keeps trees to a
    //       certain amount would allow quicker node
    //       requests
  }

  getTrees (query: ITreeQuery): ReadableStream<ITree> {
    throw new Error('not implemented!')
  }

  getNodes (query?: IPointQuery): ReadableStream<INode> {
    throw new Error('not implemented')
  }

  async getTree (id: string, metadataProperties?: string[]): Promise<ITree> {
    const trees = await this.getTrees({
      ids: [id],
      metadataProperties
    }).toArray()
    return trees[0]
  }

  getNodesWithTrees (query?: IPointQuery): ReadableStream<INodeWithTree> {
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
