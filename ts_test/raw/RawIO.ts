#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import RawIO from '../../ts/raw/RawIO'
import FeatureType, { Double } from '../../ts/api/FeatureType'
import { ReadableStream } from 'ts-stream'
import { getAll } from '../../ts/util/getAll'

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

test('Simple tree info', async t => {
  const io = new RawIO('abc', [[]])
  const trees = await getAll(io.getTrees())
  t.equals(trees.length, 1)
  const tree = trees[0]
  t.equals(tree.id, 'abc')
  t.equals(tree.scale.x, 1)
  t.equals(tree.scale.y, 1)
  t.equals(tree.scale.z, 1)
  t.equals(tree.offset.x, 0)
  t.equals(tree.offset.y, 0)
  t.equals(tree.offset.z, 0)
  t.notEquals(tree.metadata.created, null)
  t.equals(tree.numPoints, 0)
  t.equals(tree.bounds.min.x, Number.MAX_VALUE)
  t.equals(tree.bounds.min.y, Number.MAX_VALUE)
  t.equals(tree.bounds.min.z, Number.MAX_VALUE)
  t.equals(tree.bounds.max.x, -Number.MAX_VALUE)
  t.equals(tree.bounds.max.y, -Number.MAX_VALUE)
  t.equals(tree.bounds.max.z, -Number.MAX_VALUE)
  t.equals(tree.boundsConforming, tree.bounds)
  t.equals(tree.schema.length, 3)
  t.equals(tree.schema[0].name, 'x')
  t.equals(tree.schema[1].name, 'y')
  t.equals(tree.schema[2].name, 'z')
  t.equals(tree.schema[0].type, FeatureType.double)
  t.equals(tree.schema[1].type, FeatureType.double)
  t.equals(tree.schema[2].type, FeatureType.double)
})

const POINT_ZERO = { x: 0, y: 0, z: 0 }
const POINT_ONE = { x: 1, y: 1, z: 1 }
const POINT_TWO = { x: 2, y: 2, z: 2 }
const POINT_THREE = { x: 3, y: 3, z: 3 }
const POINT_FOUR = { x: 4, y: 4, z: 4 }

test('bounds for multiple points', async t => {
  const io = new RawIO('abc', [[
    { x: 2, y: 2, z: 2 },
    POINT_ZERO,
    { x: 1, y: 1, z: 1 }
  ]])
  const tree = await io.getTree('abc')
  t.deepEquals(tree.bounds, {
    min: POINT_ZERO,
    max: { x: 2, y: 2, z: 2 }
  }, 'automatic bounds calculation works')
  t.equals(tree.bounds, tree.boundsConforming, 'the conforming bounds should be same for regular bounds')
})

test('getting nodes', async t => {
  const io = new RawIO('abc', [[POINT_ZERO]])
  const nodes = await getAll(io.getNodes())
  t.equals(nodes.length, 1, 'One node should be returned for one array')
  const node = nodes[0]
  t.equals(node.treeId, 'abc', 'TreeId fits the input ID')
  t.equals(node.address, undefined, 'As its not an octree: no address')
  t.equals(node.id, '0', 'The ID has been stringified')
  t.equals(node.numPoints, 1, 'One point in the whole array.')
})

test('fetching nodes with trees', async t => {
  const io = new RawIO('abc', [[POINT_ZERO]])
  const tree = await io.getTree('abc')
  const nodes = await getAll(io.getNodesWithTrees())
  t.equals(nodes.length, 1, 'Also with trees it should stay 1')
  t.equals(nodes[0].tree, tree, 'The tree is the one we expect.')
})

test('fetching points', async t => {
  const io = new RawIO('abc', [[POINT_ZERO]])
  const points = await getAll(io.getPoints())
  t.equals(points.length, 1)
  t.equals((await getAll(points[0].points))[0], POINT_ZERO)
})

test('fetching with features should be able to return points with more properties than requested.', async t => {
  const io = new RawIO('abc', [[POINT_ZERO]])
  const points = await getAll(io.getPoints({
    schema: [x]
  }))
  t.equals((await getAll(points[0].points))[0], POINT_ZERO)
})

/*
test('fetching features that dont exist', async t => {
  const io = new RawIO('abc', [[POINT_ZERO]])
  try {
    const p = await io.getPoints({ schema: [r] }).toArray()
    t.fail('There should have been an error here')
  } catch (e) {
    t.equals(e.message, '#0: r[uint32] is not available.')
  }
})
*/
