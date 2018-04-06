import { IQueryResponse, IQuery, ITreeQuery, ITree, INodeRequest, IFeature, INode, Oct, Vector3, Plane, Box3, Frustum, IPnextIO } from '../../ts/Types'
import { Readable } from 'stream'

class Tree implements ITree {
  public id: string
  public bounds: Box3
  public scale?: Vector3
  public offset?: Vector3
  public numPoints?: number | Long
  public boundsConforming?: Box3
  public schema?: IFeature[]
  public metadata?
}

class Response implements IQueryResponse {

  /** QueryResponse nodes */
  public nodes?: (INode[] | null)

  /** QueryResponse feature */
  public feature?: (IFeature[] | null)
}

class TreeNode {
  density: number
  parent?: TreeNode
  node?: Oct
  address: Oct[]
  children?: TreeNode[]
  bounds: Box3
  points: Vector3[]

  constructor (parent: TreeNode = null, node: Oct = null, points: Vector3[]) {
    this.parent = parent
    this.node = node
    if (node) {
      if (parent) {
        this.address = parent.address.concat(node)
      } else {
        this.address = [node]
      }
    } else {
      this.address = []
    }
    if (!points) {
      points = []
    }
    this.points = points
    if (points.length > 0) {
      this.bounds = getBounds(points)
    }
  }

  getChild (node: Oct): (TreeNode | null) {
    if (!this.children) {
      return null
    }
    for (let child of this.children) {
      if (child.node === node) {
        return child
      }
    }
    return null
  }

  hasChild (node: Oct): boolean {
    return this.getChild(node) !== null
  }
}

class TraversalContext {
  nodes: TreeNode[]
  public numPoints: number = 0

  constructor (root: TreeNode) {
    this.nodes = [root]
  }
}

function collectNodes (tree: SampleImpl, query: IQuery, result: Response, context: TraversalContext): boolean {
  let node: TreeNode
  const frustum = query.frustum
  while (context.nodes.length > 0) {
    node = context.nodes.pop()
    if (!node.bounds) {
      continue
    }
    if (!frustum.intersectsBox(node.bounds)) {
      continue
    }
    if (query.cut && !query.cut.intersectsBox(node.bounds)) {
      continue
    }
    if (query.density && node.density < query.density.max) {
      continue
    }
    if (!result.nodes) {
      result.nodes = []
    }
    const nextNumPoints = context.numPoints + node.points.length
    if (!query.relevance || query.relevance.min && nextNumPoints >= query.relevance.min) {
      result.nodes.push({
        treeId: tree.id,
        address: node.address,
        info: null,
        numPoints: node.points.length
      })
    }
    context.numPoints = nextNumPoints
    if (query.relevance && query.relevance.max < context.numPoints) {
      return false
    }
    if (!node.children) {
      continue
    }
    for (let child of node.children) {
      // TODO: Think about if the child's density warrants a different order!
      context.nodes.push(child)
    }
  }
  return true
}

function getBounds (points: Vector3[]): Box3 {
  const result = new Box3()
  if (points) {
    for (let point of points) {
      result.expandByPoint(point)
    }
  }
  return result
}

export default class SampleImpl implements IPnextIO {

  root: TreeNode
  metadata: any
  bounds: Box3
  numPoints: number | Long
  offset: Vector3
  scale: Vector3
  schema: IFeature[]
  lookup = null
  id: string

  constructor (points: Vector3[]) {
    this.lookup = {}
    this.id = 'test'
    this.root = new TreeNode(null, null, points)
    this.lookup[''] = this.root
  }

  queryPoints (query: IQuery): Promise<IQueryResponse> {
    const result = new Response()
    if (query.cut && !query.cut.intersectsBox(this.bounds)) {
      return Promise.resolve(result)
    }
    collectNodes(this, query, result, new TraversalContext(this.root))
    return Promise.resolve(result)
  }

  getTree (treeQuery: ITreeQuery): Promise<ITree> {
    if (treeQuery.id !== this.id) {
      return Promise.reject(new Error('Dont know the ID'))
    }
    const tree = new Tree()
    tree.id = this.id
    tree.bounds = this.bounds
    tree.numPoints = this.numPoints
    tree.offset = this.offset
    tree.scale = this.scale
    tree.schema = this.schema
    if (treeQuery.metadataProperties) {
      tree.metadata = this._reduceMeta(treeQuery.metadataProperties)
    } else {
      tree.metadata = this.metadata
    }
    return Promise.resolve(tree)
  }

  getNodes (request: INodeRequest): Readable {
    const stream = new Readable()
    let offsetTime = 20
    request.nodes.forEach(node => {
      offsetTime += 20
      setTimeout(() => {
        const address = node.address.toString()
        stream.push(this.lookup[address])
      }, offsetTime)
    })
    return stream
  }

  _reduceMeta (properties: string[]): any {
    const newMeta = {}
    properties.forEach(prop => {
      newMeta[prop] = this.metadata[prop]
    })
    return newMeta
  }
}
