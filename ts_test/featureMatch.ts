#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import featureMatch from '../ts/util/featureMatch'
import Feature from '../ts/api/Feature'
import FeatureType from '../ts/api/FeatureType'

test('comparing two empty schema', async t => {
  t.equals(featureMatch([], []), null)
})

test('comparing two equal schema', async t => {
  t.equals(featureMatch([Feature.x], [Feature.x]), null)
})

test('comparing two different schema should result in an error', async t => {
  const error = featureMatch([Feature.x], [Feature.y])
  t.notEquals(error, null)
})

test('comparing two different schema should result in an error', async t => {
  const error = featureMatch([Feature.x], [Feature.y])
  t.notEquals(error, null)
})

test('comparing two different schema with two different orders should work', async t => {
  const error = featureMatch([Feature.y, Feature.x], [Feature.x, Feature.y])
  t.equals(error, null)
})

test('comparing two similar schema', async t => {
  const error = featureMatch([Feature.x], [{ name: 'x', type: FeatureType.double }])
  t.equals(error, null)
})

test('comparing two similar but not-matching type schema', async t => {
  const error = featureMatch([Feature.x], [{ name: 'x', type: FeatureType.uint32 }])
  t.notEquals(error, null)
})
