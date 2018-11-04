import Stream from 'ts-stream'
import FeatureType from '../api/FeatureType'
import IBox3 from '../api/IBox3'
import INode from '../api/INode'
import INodeQuery from '../api/INodeQuery'
import IPoint from '../api/IPoint'
import IPointData from '../api/IPointData'
import ITree from '../api/ITree'
import IVector3 from '../api/IVector3'
import { AbstractSingleTreeIO } from '../util/AbstractSingleTreeIO'
import expandBox from '../util/expandBox'

function createBox (): IBox3 {
  return {
    min: { x: Number.MAX_VALUE, y: Number.MAX_VALUE, z: Number.MAX_VALUE },
    max: { x: -Number.MAX_VALUE, y: -Number.MAX_VALUE, z: -Number.MAX_VALUE }
  }
}

function collectBounds (points: IPoint[]): IBox3 {
  const bounds: IBox3 = createBox()
  for (const point of points) {
    if (point.x < bounds.min.x) {
      bounds.min.x = point.x
    }
    if (point.x > bounds.max.x) {
      bounds.max.x = point.x
    }
    if (point.y < bounds.min.y) {
      bounds.min.y = point.y
    }
    if (point.y > bounds.max.y) {
      bounds.max.y = point.y
    }
    if (point.z < bounds.min.z) {
      bounds.min.z = point.z
    }
    if (point.z > bounds.max.z) {
      bounds.max.z = point.z
    }
  }
  return bounds
}

class TreeInfo implements ITree {
  id: string
  bounds: IBox3
  boundsConforming: IBox3
  scale: IVector3 = { x: 1, y: 1, z: 1 }
  offset: IVector3 = { x: 0, y: 0, z: 0 }
  numPoints: number | Long
  schema = [
    { type: FeatureType.double, name: 'x' },
    { type: FeatureType.double, name: 'y' },
    { type: FeatureType.double, name: 'z' }
  ]
  metadata: { [k: string]: any }
  boundsForPoints: IBox3[]

  constructor (id: string, pointData: IPoint[][]) {
    this.id = id || (Date.now().toString(32) + '.' + Math.random().toString(32))
    this.numPoints = pointData.reduce((total: number, points: IPoint[]) => {
      return total += points.length
    }, 0)
    this.boundsForPoints = pointData.map(collectBounds)
    this.boundsConforming = this.boundsForPoints.reduce(expandBox)
    this.bounds = this.boundsConforming
    this.metadata = {
      created: new Date().toISOString()
    }
  }
}

export default class RawIO<Point extends IPoint> extends AbstractSingleTreeIO<TreeInfo, INode, Point> {
  pointData: Point[][]
  nodes: INode[]
  ids: number[]

  constructor (id: string, pointData: Point[][]) {
    super(Promise.resolve(new TreeInfo(id, pointData)))
    this.pointData = pointData
    this.ids = pointData.map((value: Point[], index: number) => index)
    this.nodes = pointData.map((pointArray, index): INode => {
      return {
        id: index.toString(),
        numPoints: pointArray.length
      }
    })
    this.nodes[0].treeId = id
  }

  async _getNodes (stream: Stream<INode>, query?: INodeQuery) {
    // TODO: Implement filtering based on query here.
    for (const node of this.nodes) {
      await stream.write(node)
    }
  }

  async _getPoints (node: INode, tree: TreeInfo): Promise<IPointData<Point, INode>> {
    return {
      node,
      points: Stream.from(this.pointData[node.id])
    }
  }
}
