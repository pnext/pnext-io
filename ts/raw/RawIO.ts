import IPNextIO from '../api/IPNextIO'
import Stream from 'ts-stream'
import ITree from '../api/ITree'
import INode from '../api/INode'
import IPoint from '../api/IPoint'
import INodeSelector from '../api/INodeSelector'
import IPointQuery from '../api/IPointQuery'
import ITreeQuery from '../api/ITreeQuery'
import INodeQuery from '../api/INodeQuery'
import IVector3 from '../api/IVector3'
import IBox3 from '../api/IBox3'
import IFeature from '../api/IFeature'
import FeatureType from '../api/FeatureType'
import AbstractSingleTreeIO from '../util/AbstractSingleTreeIO'
import expandBox from '../util/expandBox'
import featureMatch from '../util/featureMatch'

function ignoreError () {
  return
}

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

export default class RawIO extends AbstractSingleTreeIO implements IPNextIO {
  pointData: IPoint[][]
  ids: number[]

  constructor (id: string, pointData: IPoint[][]) {
    super(Promise.resolve(new TreeInfo(id, pointData)))
    this.pointData = pointData
    this.ids = pointData.map((value: IPoint[], index: number) => index)
  }

  _getNodes (stream: Stream<INode>, query?: INodeQuery) {
    let first = true
    this.treeP.then(tree => {
      let index = 0
      for (const points of this.pointData) {
        const node: INode = {
          id: index.toString(),
          numPoints: tree.numPoints
        }
        if (first) {
          node.treeId = tree.id
        }
        stream.write(node)
        index ++
      }
      stream.end()
    })
  }

  _getPoints (stream: Stream<{ [k: string]: any; }>, query?: IPointQuery): void {
    this.treeP.then(tree => {
      let start = query && query.start || 0
      let end = query && query.end || tree.numPoints
      if (start < 0) {
        return stream.end(new Error(`Invalid query: start(${start}) needs to be bigger 0`))
      }
      if (end > tree.numPoints) {
        return stream.end(new Error(`Invalid query: end(${end}) needs to be within the size of this tree(${tree.numPoints})`))
      }
      if (end < start) {
        return stream.end(new Error(`Invalid query: End before start ${start}:${end}`))
      }
      let ids: number[] = this.ids
      if (query && query.nodes) {
        ids = []
        for (const node of query.nodes) {
          if (node.treeId !== tree.id) {
            return stream.end(new Error(`Invalid tree id "${node.treeId}" requested!`)).catch(ignoreError)
          }
          if (node.address) {
            return stream.end(new Error('This tree only supports id-ed nodes')).catch(ignoreError)
          }
          if (!node.id) {
            return stream.end(new Error('Node id required!')).catch(ignoreError)
          }
          const num = parseInt(node.id, 10)
          if (isNaN(num) || num < 0 || num >= this.pointData.length) {
            return stream.end(new Error(`Invalid node: ${node.id}`)).catch(ignoreError)
          }
          ids.push(num)
        }
      }
      if (query && query.schema) {
        const error = featureMatch(tree.schema, query.schema)
        if (error) {
          return stream.end(new Error(error.map(error => error.message).join(';'))).catch(ignoreError)
        }
      }
      let count = 0
      for (const index of ids) {
        const node = this.pointData[index]
        if (count + node.length < start) {
          // Skip this node as it is entirely not used
          continue
        }
        for (const point of node) {
          if (count < start) {
            count += 1
            continue
          }
          if (count >= end) {
            return stream.end()
          }
          stream.write(point)
          count += 1
        }
      }
      stream.end()
    })
  }
}
