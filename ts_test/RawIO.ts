#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import RawIO from '../ts/raw/RawIO'
import FeatureType from '../ts/api/FeatureType'
import Feature from '../ts/api/Feature'

test('Simple tree info', async t => {
  const io = new RawIO('abc', [[]])
  const trees = await io.getTrees().toArray()
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
  })
  t.equals(tree.bounds, tree.boundsConforming)
})

test('getting nodes', async t => {
  const io = new RawIO('abc', [[POINT_ZERO]])
  const nodes = await io.getNodes().toArray()
  t.equals(nodes.length, 1)
  const node = nodes[0]
  t.equals(node.treeId, 'abc')
  t.equals(node.address, undefined)
  t.equals(node.id, '0')
  t.equals(node.numPoints, 1)
})

test('fetching nodes', async t => {
  const io = new RawIO('abc', [[POINT_ZERO]])
  const nodes = await io.getNodes().toArray()
  t.equals(nodes.length, 1)
  const node = nodes[0]
  t.equals(node.treeId, 'abc')
  t.equals(node.address, undefined)
  t.equals(node.id, '0')
  t.equals(node.numPoints, 1)
})

test('fetching nodes with trees', async t => {
  const io = new RawIO('abc', [[POINT_ZERO]])
  const nodes = await io.getNodesWithTrees().toArray()
  t.equals(nodes.length, 1)
  const node = nodes[0]
  t.equals(node.tree.id, 'abc')
})

test('fetching points', async t => {
  const io = new RawIO('abc', [[POINT_ZERO]])
  const points = await io.getPoints().toArray()
  t.equals(points.length, 1)
  t.equals(points[0], POINT_ZERO)
})

test('fetching with features should be able to return points with more properties than requested.', async t => {
  const io = new RawIO('abc', [[POINT_ZERO]])
  const points = await io.getPoints({
    schema: [Feature.x]
  }).toArray()
  t.equals(points[0], POINT_ZERO)
})

test('fetching features that dont exist', async t => {
  const io = new RawIO('abc', [[POINT_ZERO]])
  try {
    const p = await io.getPoints({ schema: [Feature.r] }).toArray()
    t.fail('There should have been an error here')
  } catch (e) {
    t.equals(e.message, '#0: r is not available.')
  }
})
