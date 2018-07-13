import IPNextIO from '../api/IPNextIO'
import Stream from 'ts-stream'
import ITree from '../api/ITree'
import INode from '../api/INode'
import INodeSelector from '../api/INodeSelector'
import IPointQuery from '../api/IPointQuery'
import ITreeQuery from '../api/ITreeQuery'
import INodeQuery from '../api/INodeQuery'
import IVector3 from '../api/IVector3'
import IBox3 from '../api/IBox3'
import IFeature from "../api/IFeature"
import FeatureType from "../api/FeatureType"
import Feature from '../api/Feature'
import FeatureLength from '../util/FeatureLength'
import AbstractIO from '../util/AbstractIO'
import expandBox from '../util/expandBox'

export interface IPoint {
  x: number,
  y: number,
  z: number
}

function createBox (): IBox3 {
  return {
    min: { x: Number.MAX_VALUE, y: Number.MAX_VALUE, z: Number.MAX_VALUE},
    max: { x: -Number.MAX_VALUE, y: -Number.MAX_VALUE, z: -Number.MAX_VALUE}
  }
}

function collectBounds (points: IPoint[]): IBox3 {
  const bounds: IBox3 = createBox()
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
  id: string
  bounds: IBox3
  boundsConforming: IBox3
  scale: IVector3  = { x: 1, y: 1, z: 1}
  offset: IVector3 = { x: 0, y: 0, z: 0}
  numPoints: number | Long;
  schema = [ Feature.x, Feature.y, Feature.z ]
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

export default class RawIO extends AbstractIO implements IPNextIO {
  info: TreeInfo
  pointData: IPoint[][]
  ids: number[]

  constructor (id: string, pointData: IPoint[][]) {
    super()
    this.info = new TreeInfo(id, pointData)
    this.pointData = pointData
    this.ids = pointData.map((value: IPoint[], index: number) => index)
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

  getNodes (query?: INodeQuery): Stream<INode> {
    const stream = new Stream<INode>()
    let first = true
    setImmediate(() => {
      let index = 0
      for (const points of this.pointData) {
        const node: INode = {
          id: index.toString(),
          numPoints: this.info.numPoints
        }
        if (first) {
          node.treeId = this.info.id
        }
        stream.write(node)
        index ++
      }
      stream.end()
    })
    return stream
  }

  getPoints (query?: IPointQuery): Stream<{ [k: string]: any; }> {
    const stream = new Stream<{ [k:string]: any }>()
    setImmediate(() => {
      let ids: number[] = this.ids
      if (query && query.nodes) {
        ids = []
        for (const node of query.nodes) {
          if (node.treeId !== this.info.id) {
            stream.abort(new Error(`Invalid tree id "${node.treeId}" requested!`))
            return
          }
          if (node.address) {
            stream.abort(new Error('This tree only supports id-ed nodes'))
            return
          }
          if (!node.id) {
            stream.abort(new Error('Node id requred!'))
            return
          }
          const num = parseInt(node.id, 10)
          if (isNaN(num) || num < 0 || num >= this.pointData.length) {
            stream.abort(new Error(`Invalid node: ${node.id}`))
          }
          ids.push(num)
        }
      }
      for (const index of ids) {
        for (const point of this.pointData[index]) {
          stream.write(point)
        }
      }
      stream.end()
    })
    return stream
  }
}
