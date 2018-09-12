import Stream, { ReadableStream } from 'ts-stream'
import INode from '../api/INode'
import INodeQuery from '../api/INodeQuery'
import INodeWithTree from '../api/INodeWithTree'
import IPNextIO from '../api/IPNextIO'
import IPoint from '../api/IPoint'
import IPointQuery from '../api/IPointQuery'
import ITree from '../api/ITree'
import ITreeQuery from '../api/ITreeQuery'
import { strictPointQuery } from './strictQuery'

function ignoreError () {
  return
}

function processStream <T> (byos: Stream<T> | undefined | null, template: (output: Stream<T>) => PromiseLike<void>): ReadableStream<T> {
  if (byos === undefined || byos === null) {
    byos = new Stream<T>()
  }
  template(byos)
    .then(() => byos.end().catch(ignoreError), error => byos.end(error).catch(ignoreError))
  return byos
}

export default abstract class AbstractIO implements IPNextIO {

  constructor () {
    // TODO: The trees are fetched every time again
    //       Adding a lru-cache that keeps trees to a
    //       certain amount would allow quicker node
    //       requests
  }

  abstract _getTrees (output: Stream<ITree>, query?: ITreeQuery): PromiseLike<void>
  abstract _getNodes (output: Stream<INode>, query?: INodeQuery): PromiseLike<void>
  abstract _getPoints (output: Stream<IPoint[]>, node: INodeWithTree): PromiseLike<void>

  getTrees (query?: ITreeQuery, byos?: Stream<ITree>): ReadableStream<ITree> {
    return processStream<ITree>(byos, (output: Stream<ITree>) =>
      this._getTrees(output, query)
    )
  }

  getNodes (query?: INodeQuery, byos?: Stream<INode>): ReadableStream<INode> {
    return processStream<INode>(byos, (output: Stream<INode>) =>
      this._getNodes(output, query)
    )
  }

  getPoints (query?: IPointQuery, byos?: Stream<IPoint[]>): ReadableStream<IPoint[]> {
    return processStream<IPoint[]>(byos, (output: Stream<IPoint[]>) =>
      this.getNodesWithTrees()
        .toArray()
        .then(nodesWithTrees => strictPointQuery(nodesWithTrees, query))
        .then(async strictQuery => {
          for (const nodeWithTree of strictQuery.nodesWithTrees) {
            if (!output.isEndingOrEnded()) {
              await this._getPoints(output, nodeWithTree)
            }
          }
        })
    )
  }

  async getTree (id: string, metadataProperties?: string[]): Promise<ITree> {
    const trees = await this.getTrees({
      ids: [id],
      metadataProperties
    }).toArray()
    return trees[0]
  }

  getNodesWithTrees (query?: INodeQuery, byos?: Stream<INodeWithTree>): ReadableStream<INodeWithTree> {
    const trees: { [key: string]: ITree } = {}
    let currentTreeId
    return processStream(byos, async (output: Stream<INodeWithTree>) => {
      await this.getNodes()
        .forEach(async node => {
          if (node.treeId) {
            currentTreeId = node.treeId
          } else if (!currentTreeId) {
            throw new Error('The first node arrived without a treeId!')
          }
          if (!trees[currentTreeId]) {
            trees[currentTreeId] = await this.getTree(currentTreeId)
          }
          await output.write({
            ...node,
            tree: trees[currentTreeId]
          })
        }, _ => { /* ignore */ })
    })
  }
}
