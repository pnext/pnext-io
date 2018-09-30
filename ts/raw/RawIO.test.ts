import RawIO from './RawIO'
import FeatureType, { Double } from '../api/FeatureType'
import { ReadableStream } from 'ts-stream'
import { getAll } from '../util/getAll'

const x = { type: Double, name: 'x' }
const r = { type: FeatureType.uint32, name: 'r' }

function toArray<T> (stream: ReadableStream<T>): Promise<T[]> {
  const promise = new Promise<T[]>((resolve: (value?: T[] | PromiseLike <T[]>) => void, reject: (error?: Error) => void) => {
    const arr = []
    stream.forEach((val: T) => {
      arr.push(val)
    }, (error?: Error) => error ? reject(error) : resolve(arr)).catch(reject)
  })
  return promise
}

test('Simple tree info', async () => {
  const io = new RawIO('abc', [[]])
  const trees = await getAll(io.getTrees())
  expect(trees.length).toBe(1)
  const tree = trees[0]
  expect(tree.id).toBe('abc')
  expect(tree.scale.x).toBe(1)
  expect(tree.scale.y).toBe(1)
  expect(tree.scale.z).toBe(1)
  expect(tree.offset.x).toBe(0)
  expect(tree.offset.y).toBe(0)
  expect(tree.offset.z).toBe(0)
  expect(tree.metadata.created).not.toBeNull()
  expect(tree.numPoints).toBe(0)
  expect(tree.bounds.min.x).toBe(Number.MAX_VALUE)
  expect(tree.bounds.min.y).toBe(Number.MAX_VALUE)
  expect(tree.bounds.min.z).toBe(Number.MAX_VALUE)
  expect(tree.bounds.max.x).toBe(-Number.MAX_VALUE)
  expect(tree.bounds.max.y).toBe(-Number.MAX_VALUE)
  expect(tree.bounds.max.z).toBe(-Number.MAX_VALUE)
  expect(tree.boundsConforming).toBe(tree.bounds)
  expect(tree.schema.length).toBe(3)
  expect(tree.schema[0].name).toBe('x')
  expect(tree.schema[1].name).toBe('y')
  expect(tree.schema[2].name).toBe('z')
  expect(tree.schema[0].type).toBe(FeatureType.double)
  expect(tree.schema[1].type).toBe(FeatureType.double)
  expect(tree.schema[2].type).toBe(FeatureType.double)
})
const POINT_ZERO = { x: 0, y: 0, z: 0 }
const POINT_ONE = { x: 1, y: 1, z: 1 }
const POINT_TWO = { x: 2, y: 2, z: 2 }
const POINT_THREE = { x: 3, y: 3, z: 3 }
const POINT_FOUR = { x: 4, y: 4, z: 4 }

test('bounds for multiple points', async () => {
  const x = Date.now()
  const io = new RawIO('abc', [[
    { x: 2, y: 2, z: 2 },
    POINT_ZERO,
    { x: 1, y: 1, z: 1 }
  ]])
  const tree = await io.getTree('abc')
  expect(tree.bounds).toMatchObject({
    min: POINT_ZERO,
    max: { x: 2, y: 2, z: 2 }
  }) // automatic bounds calculation works
  expect(tree.bounds).toBe(tree.boundsConforming) // the conforming bounds should be same for regular bounds
})

test('getting nodes', async () => {
  const io = new RawIO('abc', [[POINT_ZERO]])
  const nodes = await getAll(io.getNodes())
  expect(nodes.length).toBe(1) // One node should be returned for one array
  const node = nodes[0]
  expect(node.treeId).toBe('abc') // TreeId fits the input ID
  expect(node.address).toBe(undefined) // As its not an octree: no address
  expect(node.id).toBe('0') // The ID has been stringified
  expect(node.numPoints).toBe(1) // One point in the whole array.
})

test('fetching nodes with trees', async () => {
  const io = new RawIO('abc', [[POINT_ZERO]])
  const tree = await io.getTree('abc')
  const nodes = await getAll(io.getNodesWithTrees())
  expect(nodes.length).toBe(1) // Also with trees it should stay 1
  expect(nodes[0].tree).toBe(tree) // The tree is the one we expect.
})

test('fetching points', async () => {
  const io = new RawIO('abc', [[POINT_ZERO]])
  const points = await getAll(io.getPoints())
  expect(points.length).toBe(1)
  expect((await getAll(points[0].points))[0]).toBe(POINT_ZERO)
})

test('fetching with features should be able to return points with more properties than requested.', async () => {
  const io = new RawIO('abc', [[POINT_ZERO]])
  const points = await getAll(io.getPoints({
    schema: [x]
  }))
  expect((await getAll(points[0].points))[0]).toBe(POINT_ZERO)
})

/*
test('fetching features that dont exist', async () => {
  expect.assertions(1)
  const io = new RawIO('abc', [[POINT_ZERO]])
  try {
    const p = await io.getPoints({ schema: [r] }).toArray()
    t.fail('There should have been an error here')
  } catch (e) {
    expect(e.message).toBe('#0: r[uint32] is not available.')
  }
})
*/
