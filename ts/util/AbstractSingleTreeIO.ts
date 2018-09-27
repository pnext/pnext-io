import Stream from 'ts-stream'
import { IDuplex } from '../api/IDuplex'
import INode from '../api/INode'
import INodeQuery from '../api/INodeQuery'
import INodeWithTree from '../api/INodeWithTree'
import IPoint from '../api/IPoint'
import ITree from '../api/ITree'
import ITreeQuery from '../api/ITreeQuery'
import AbstractIO from '../util/AbstractIO'
import { mapStreamTo } from './mapStream'

function ignoreError () {
  return
}

export default abstract class AbstractSingleTreeIO<
  Tree extends ITree,
  Node extends INode,
  Point extends IPoint
> extends AbstractIO<Tree, Node, Point> {
  treeP: PromiseLike<Tree>

  constructor (treeP: PromiseLike<Tree>) {
    super()
    this.treeP = treeP
  }

  async _getTrees (stream: Stream<Tree>, query?: ITreeQuery): Promise<void> {
    const tree = await this.treeP
    const ids = query && query.ids ? query.ids : [ null ]
    for (const id of ids) {
      if (id !== null && id !== tree.id) {
        throw new Error(`Unknown tree ${id}`)
      }
      await stream.write(tree)
    }
  }

  _getNodesWithTrees (output: IDuplex<INodeWithTree<Node, Tree>>, query?: INodeQuery): PromiseLike<void> {
    let currentTreeId = null
    return mapStreamTo(this.getNodes(query), async node => {
      const tree = await this.treeP
      if (node.treeId) {
        currentTreeId = node.treeId
      } else if (!currentTreeId) {
        throw new Error('The first node arrived without a treeId!')
      }
      return { node, tree }
    }, output)
  }
}
