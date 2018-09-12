#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import FeatureType from '../../ts/api/FeatureType'
import featureMatch from '../../ts/util/featureMatch'

const x = { type: FeatureType.uint16, name: 'x' }
const y = { type: FeatureType.uint16, name: 'y' }

test('comparing two empty schema', async t => {
  t.equals(featureMatch([], []), null)
})

test('comparing two equal schema', async t => {
  t.equals(featureMatch([x], [x]), null)
})

test('comparing two different schema should result in an error', async t => {
  const error = featureMatch([x], [y])
  t.notEquals(error, null)
})

test('comparing two different schema should result in an error', async t => {
  const error = featureMatch([x], [y])
  t.notEquals(error, null)
})

test('comparing two different schema with two different orders should work', async t => {
  const error = featureMatch([y, x], [x, y])
  t.equals(error, null)
})

test('comparing two similar schema', async t => {
  const error = featureMatch([x], [{ name: 'x', type: FeatureType.uint16 }])
  t.equals(error, null)
})

test('comparing two similar but not-matching type schema', async t => {
  const error = featureMatch([x], [{ name: 'x', type: FeatureType.uint32 }])
  t.notEquals(error, null)
})
