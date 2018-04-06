#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import Types from '../ts/Types'
import { Box3, Plane, Frustum, PerspectiveCamera, Matrix4, Vector3, Vector } from 'three'
import SampleImpl from './impl/SampleImpl'
import toPromise from 'stream-to-promise'
import through2 from 'through2'

function frustumForCamera (cam: PerspectiveCamera): Frustum {
  return (new Frustum()).setFromMatrix(
    new Matrix4()
      .multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse)
  )
}

function twoPointCam (origin: Vector3, target: Vector3): PerspectiveCamera {
  const cam = new PerspectiveCamera()
  cam.position.copy(origin)
  cam.lookAt(target)
  cam.updateMatrix()
  cam.updateMatrixWorld(true)
  cam.updateProjectionMatrix()
  return cam
}

function twoPointFrustum (origin: Vector3, target: Vector3): Frustum {
  return frustumForCamera(twoPointCam(origin, target))
}

function queryTree (impl: SampleImpl | any, query: any) {
  if (!(impl instanceof SampleImpl)) {
    impl = new SampleImpl(impl)
  }
  return (impl as SampleImpl).queryPoints(Types.Query.fromObject(query))
}

test('make sure to implement three API', t => {
  t.ok(new Types.Box3() instanceof Box3)
  t.ok(new Types.Plane() instanceof Plane)
  t.ok(new Types.Frustum() instanceof Frustum)
  t.end()
})

test('Sample Query to an empty set', async t => {
  const result = await queryTree(null, {
    frustum: frustumForCamera(new PerspectiveCamera())
  })
  t.equals(result.nodes, undefined)
})

test('Valid, basic query', async t => {
  const point = Types.Vector3.fromObject({ x: 0, y: 0, z: 0 })
  const points = [ point ]
  let result = await queryTree(points,
    { frustum: twoPointFrustum(new Vector3(10, 0, 0), point) }
  )
  t.notEquals(result.nodes, undefined, 'The point should be part of the result, as the camera is pointing at it.')
  t.equals(result.nodes.length, 1)
  t.same(result.nodes[0], {
    address: [],
    info: null,
    treeId: 'test',
    numPoints: 1
  })

  result = await queryTree(points,
    { frustum: twoPointFrustum(new Vector3(10, 0, 0), new Vector3(20, 0, 0)) }
  )
  t.equals(result.nodes, undefined, 'A change of camera should hide the node.')
})

class PointParser {
  length: Number = 0
  constructor (schema: Types.IFeature[]) {
    length = schema.reduce((total: number, feature: Types.IFeature) => total + feature.byteCount, 0)
  }
}

test('Loading data as query result', async t => {
  const point = Types.Vector3.fromObject({ x: 1, y: 1, z: 1 })
  const tree = new SampleImpl([ point ])
  const result = await queryTree(tree, { frustum: twoPointFrustum(new Vector3(10, 0, 0), point) })
  const info = await tree.getTree(Types.TreeQuery.fromObject({ id: result.nodes[0].treeId }))
  const pointParser = new PointParser(info.schema)
  let buffer: Buffer
  const data: Vector3[] = await toPromise(tree.getNodes(Types.NodeRequest.fromObject(result)).pipe(
    through2({ objectMode: true }, function (chunk, enc, callback) {
      if (buffer) {
        buffer = Buffer.concat([buffer, chunk])
      } else {
        buffer = chunk
      }
      while (buffer.length > pointParser.length) {
        let point: Vector3 = pointParser.parse(buffer)
        if (point) {
          this.push(point)
          buffer = buffer.slice(pointParser.length)
        }
      }
      if (buffer.length === 0) {
        buffer = null
      }
    })
  ))
  t.equals(data.length, 1)
  t.same(data[0], { x: 1, y: 1, z: 1 })
})
