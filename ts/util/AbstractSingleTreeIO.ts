import Stream, { ReadableStream } from 'ts-stream'
import INode from '../api/INode'
import INodeQuery from '../api/INodeQuery'
import INodeWithTree from '../api/INodeWithTree'
import ITree from '../api/ITree'
import ITreeQuery from '../api/ITreeQuery'
import AbstractIO from '../util/AbstractIO'

function ignoreError () {
  return
}

export default abstract class AbstractSingleTreeIO extends AbstractIO {
  treeP: PromiseLike<ITree>

  constructor (treeP: PromiseLike<ITree>) {
    super()
    this.treeP = treeP
  }

  async _getTrees (stream: Stream<ITree>, query?: ITreeQuery): Promise<void> {
    const tree = await this.treeP
    const ids = query && query.ids ? query.ids : [ null ]
    for (const id of ids) {
      if (id !== null && id !== tree.id) {
        throw new Error(`Unknown tree ${id}`)
      }
      await stream.write(tree)
    }
  }

  getNodesWithTrees (query?: INodeQuery): ReadableStream<INodeWithTree> {
    let currentTreeId = null
    return this.getNodes(query)
      .map(async (node: INode) => {
        const tree = await this.treeP
        if (node.treeId) {
          currentTreeId = node.treeId
        } else if (!currentTreeId) {
          throw new Error('The first node arrived without a treeId!')
        }
        return {
          ...node,
          tree
        }
      })
  }
}
