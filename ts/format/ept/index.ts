import IPNextIO from '../../api/IPNextIO'
import ITreeQuery from '../../api/ITreeQuery'
import INodeQuery from '../../api/INodeQuery'
import IPointQuery from '../../api/IPointQuery'
import INode from '../../api/INode'
import ITree from '../../api/ITree'
import IFeature from '../../api/IFeature'
import AbstractIO from '../../util/AbstractIO'
import { Stream, ReadableStream } from 'ts-stream'
import selectNodes from '../../util/selectNodes'
import IInput from '../IInput'
import INodeTree from '../../util/INodeTree'
import loadTree from './tree'
import loadRootNodes from './nodes'
import INodeSelector from '../../api/INodeSelector'
import IReader from '../../reader/IReader'

function createBinReader (schema: IFeature[], request: IFeature[]): IReader {
  
}

function createReader (dataType: string, schema: IFeature[]): IReader {
  if (dataType === 'bin') {
    return createBinReader(schema)
  }
  throw new Error(`Unsupported dataType: ${dataType}`)
}

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

  loadReader (): Promise<IReader> {
    return this.loadTree()
      .then((tree: ITree) => createReader(tree.metadata.dataType, tree.schema))
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

  loadNodes (selectors?: INodeSelector[]): ReadableStream<INode> {
    if (selectors) {
      // TODO: Implement me!
    }
    return this.getNodes()
  }

  getNodePoints (node: INode, treeFeatures: IReader, output: Stream<{ [k: string]: any }>): void {
    this.input.binaryStream(`${node.id}`)
  }

  getPoints (query?: IPointQuery): ReadableStream<{ [k: string]: any }> {
    const pointStream = new Stream<{ [k: string]: any }>()
    this.loadReader()
      .then(reader => {
        const nodeStream = this.loadNodes(query.nodes)
        nodeStream.forEach(node =>
          this.getNodePoints(node, reader, pointStream)
        ).then(() => {
          pointStream.end()
        })
      })
    return pointStream
  }
}
