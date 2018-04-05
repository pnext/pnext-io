#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import Types from '../ts/Types'
import { Box3, Plane, Frustum, PerspectiveCamera, Matrix4, Vector3 } from 'three'
import SampleImpl from './impl/SampleImpl'

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
  return impl.queryPoints(Types.Query.fromObject(query))
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
  t.equals(result.feature, undefined)
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
    treeId: 'test'
  })
  t.equals(result.feature, undefined)

  result = await queryTree(points,
    { frustum: twoPointFrustum(new Vector3(10, 0, 0), new Vector3(20, 0, 0)) }
  )
  t.equals(result.nodes, undefined, 'A change of camera should hide the node.')
  t.equals(result.feature, undefined)
})
