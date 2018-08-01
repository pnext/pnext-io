import IPNextIO from '../../api/IPNextIO'
import ITreeQuery from '../../api/ITreeQuery'
import INodeQuery from '../../api/INodeQuery'
import IPointQuery from '../../api/IPointQuery'
import INode from '../../api/INode'
import ITree from '../../api/ITree'
import AbstractIO from '../../util/AbstractIO'
import { Stream, ReadableStream } from 'ts-stream'
import selectNodes from '../../util/selectNodes'
import IInput from '../IInput'
import INodeTree from '../../util/INodeTree'
import loadTree from './tree'
import loadRootNodes from './nodes'

export class EPT extends AbstractIO implements IPNextIO {

  tree: Promise<ITree>
  input: IInput
  rootNodes: Promise<INodeTree[]>

  constructor (input: IInput) {
    super()
    this.input = input
  }

  getTrees (query?: ITreeQuery): ReadableStream <ITree> {
    return Stream.from([this.loadTree()])
  }

  loadTree (): Promise<ITree> {
    if (!this.tree) {
      this.tree = loadTree(this.input)
    }
    return this.tree
  }

  getNodes (query?: INodeQuery): ReadableStream <INode> {
    const stream = new Stream<INode>()
    this.loadRootNodes().then(rootTreeNodes => {
      selectNodes(query, rootTreeNodes, {
        addNode (node: INode): void {
          stream.write(node)
        },
        isClosed: (): boolean => stream.isEnded(),
        end () {
          stream.end()
        }
      })
    })
    return stream
  }

  loadRootNodes (): Promise<INodeTree[]> {
    if (!this.rootNodes) {
      this.rootNodes = this.loadTree()
        .then((tree: ITree) => loadRootNodes(this.input, tree))
    }
    return this.rootNodes
  }

  getPoints (query?: IPointQuery): ReadableStream<{ [k: string]: any }> {
    throw new Error('Method not implemented.')
  }
}
