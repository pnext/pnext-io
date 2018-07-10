import IPNextIO from '../api/IPNextIO'
import Stream from 'ts-stream'
import ITree from '../api/ITree'
import INode from '../api/INode'
import IPointQuery from '../api/IPointQuery'
import ITreeQuery from '../api/ITreeQuery'
import INodeQuery from '../api/INodeQuery'
import IVector3 from '../api/IVector3'
import IBox3 from '../api/IBox3'
import IFeature from "../api/IFeature"
import FeatureType from "../api/FeatureType"
import FeatureLength from '../util/FeatureLength'
import AbstractIO from '../util/AbstractIO'

export interface IPoint {
  x: number,
  y: number,
  z: number
}

function collectBounds (points: IPoint[]): IBox3 {
  const bounds: IBox3 = {
    min: { x: Number.MAX_VALUE, y: Number.MAX_VALUE, z: Number.MAX_VALUE},
    max: { x: -Number.MAX_VALUE, y: -Number.MAX_VALUE, z: -Number.MAX_VALUE}
  }
  for (const point of points) {
    if (point.x < bounds.min.x) {
      bounds.min.x = point.x
    }
    if (point.x > bounds.max.x ) {
      bounds.max.x = point.x
    }
    if (point.y < bounds.min.y) {
      bounds.min.y = point.y
    }
    if (point.y > bounds.max.y ) {
      bounds.max.y = point.y
    }
    if (point.z < bounds.min.z) {
      bounds.min.z = point.z
    }
    if (point.z > bounds.max.z ) {
      bounds.max.z = point.z
    }
  }
  return bounds
}

class TreeInfo implements ITree {
  id: string;
  bounds: IBox3;
  boundsConforming: IBox3;
  scale: IVector3  = { x: 1, y: 1, z: 1}
  offset: IVector3 = { x: 0, y: 0, z: 0}
  numPoints: number | Long;
  schema = [
    { name: 'x', type: FeatureType.double, length: FeatureLength[FeatureType.double] },
    { name: 'y', type: FeatureType.double, length: FeatureLength[FeatureType.double] },
    { name: 'z', type: FeatureType.double, length: FeatureLength[FeatureType.double] }
  ]
  metadata: { [k: string]: any }

  constructor (id: string, points: IPoint[]) {
    this.id = id || (Date.now().toString(32) + '.' + Math.random().toString(32))
    this.numPoints = points.length
    this.boundsConforming = collectBounds(points)
    this.bounds = this.boundsConforming
    this.metadata = {
      created: new Date().toISOString()
    }
  }
}

export default class RawIO extends AbstractIO implements IPNextIO {
  info: TreeInfo
  points: IPoint[]

  constructor (id: string, points: IPoint[]) {
    super()
    this.info = new TreeInfo(id, points)
    this.points = points
  }

  getTrees (query?: ITreeQuery): Stream<ITree> {
    const stream = new Stream<ITree>()
    setImmediate(() => {
      if (query && query.ids) {
        for (const id of query.ids) {
          if (id !== this.info.id) {
            stream.abort(new Error(`Unknown tree ${id}`))
            return
          }
        }
      }
      stream.write(this.info)
      stream.end()
    })
    return stream
  }

  getNodes (query?: IPointQuery): Stream<INode> {
    const stream = new Stream<INode>()
    setImmediate(() => {
      const node: INode = {
        treeId: this.info.id,
        id: '0',
        numPoints: this.info.numPoints
      }
      stream.write(node)
      stream.end()
    })
    return stream
  }

  getData (query?: INodeQuery): Stream<{ [k: string]: any; }> {
    const stream = new Stream<{ [k:string]: any }>()
    setImmediate(() => {
      for (const node of query.nodes) {
        if (node.treeId !== this.info.id) {
          stream.abort(new Error(`Invalid tree id "${node.treeId}" requested!`))
          return
        }
        if (node.address) {
          stream.abort(new Error('This tree only supports id-ed nodes'))
          return
        }
        if (node.id !== '0') {
          stream.abort(new Error(`Unknown node "${node.id}"`))
          return
        }
        for (const point of this.points) {
          stream.write(point)
        }
      }
      stream.end()
    })
    return stream
  }
}
