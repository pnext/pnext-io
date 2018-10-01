import Stream from 'ts-stream'
import { IDuplex } from '../api/IDuplex'
import INode from '../api/INode'
import INodeQuery from '../api/INodeQuery'
import INodeWithTree from '../api/INodeWithTree'
import IPNextIO from '../api/IPNextIO'
import IPointData from '../api/IPointData'
import IPointQuery from '../api/IPointQuery'
import { IReadable } from '../api/IReadable'
import ITree from '../api/ITree'
import ITreeQuery from '../api/ITreeQuery'
import { filterForQuery } from './filterForQuery'
import { filterStream } from './filterStream'
import { getOne } from './getOne'
import { mapStreamTo } from './mapStream'
import IPoint from '../api/IPoint'

function ignoreError () {
  return
}

export function processStream <T> (byos: IDuplex<T> | undefined | null, template: (output: IDuplex<T>) => PromiseLike<void>): IReadable<T> {
  if (byos === undefined || byos === null) {
    byos = new Stream<T>()
  }
  template(byos)
    .then(() => byos.end().catch(ignoreError), error => byos.end(error).catch(ignoreError))
  return byos
}

export abstract class AbstractIO<
  Tree extends ITree,
  Node extends INode,
  Point extends IPoint = IPoint
> implements IPNextIO<Tree, Node, Point> {

  constructor () {
    // TODO: The trees are fetched every time again
    //       Adding a lru-cache that keeps trees to a
    //       certain amount would allow quicker node
    //       requests
  }

  abstract _getTrees (output: IDuplex<Tree>, query?: ITreeQuery): PromiseLike<void>
  abstract _getNodes (output: IDuplex<Node>, query?: INodeQuery): PromiseLike<void>
  abstract _getPoints (node: Node, tree: Tree): PromiseLike<IPointData<Point, Node>>

  _getNodesWithTrees (output: IDuplex<INodeWithTree<Node, Tree>>, query?: INodeQuery): PromiseLike<void> {
    const trees: { [key: string]: Tree } = {}
    let currentTreeId
    return this.getNodes()
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
          node,
          tree: trees[currentTreeId]
        })
      }, _ => { /* ignore */ })
  }

  getTrees (query?: ITreeQuery, byos?: IDuplex<Tree>): IReadable<Tree> {
    return processStream(byos, (output: Stream<Tree>) =>
      this._getTrees(output, query)
    )
  }

  getNodes (query?: INodeQuery, byos?: IDuplex<Node>): IReadable<Node> {
    return processStream(byos, (output: Stream<Node>) =>
      this._getNodes(output, query)
    )
  }

  getPoints (query?: IPointQuery, byos?: IDuplex<IPointData<Point, Node>>) {
    const filter = filterForQuery<Tree, Node>(query)
    // TODO: check the query for schema
    return processStream(byos, (output: IDuplex<IPointData<Point, Node>>) => {
      let nodeWithTreeS = this.getNodesWithTrees()
      if (filter !== null) {
        nodeWithTreeS = filterStream(nodeWithTreeS, filter)
      }
      return mapStreamTo(
        nodeWithTreeS,
        nodeWithTree => this._getPoints(nodeWithTree.node, nodeWithTree.tree),
        output
      )
    })
  }

  async _getAllPoints (output: IDuplex<IPointData<Point, Node>>, nodesWithTrees: INodeWithTree<Node, Tree>[]) {
    return this.getPoints(null, output)
  }

  getTree (id: string, metadataProperties?: string[]) {
    return getOne(this.getTrees({
      ids: [id],
      metadataProperties
    }))
  }

  getNodesWithTrees (query?: INodeQuery, byos?: Stream<INodeWithTree<Node, Tree>>): IReadable<INodeWithTree<Node, Tree>> {
    return processStream(byos, (output: Stream<INodeWithTree<Node, Tree>>) => this._getNodesWithTrees(output, query))
  }
}
