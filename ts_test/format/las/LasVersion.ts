#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import { LasVersion, LasVersions, gteVersion } from '../../../ts/format/las/LasVersion'

test('Version double check', async t => {
  t.deepEquals(Object.keys(LasVersion), [
    'V1_0', 'V1_1', 'V1_2', 'V1_3', 'V1_4'
  ], 'All Keys correct')

  t.deepEquals((Object as any).values(LasVersion), [
    '1.0', '1.1', '1.2', '1.3', '1.4'
  ], 'All Values correct')
})

test('Order of versions, double check', async t => {
  t.deepEquals(LasVersions, [
    LasVersion.V1_0,
    LasVersion.V1_1,
    LasVersion.V1_2,
    LasVersion.V1_3,
    LasVersion.V1_4
  ], 'Versionlist is of correct order')
})

test('gte', async t => {
  function ok (a: LasVersion, b: LasVersion) {
    t.equals(gteVersion(a, b), true, `${a} is >= than ${b}`)
  }
  function not (a: LasVersion, b: LasVersion) {
    t.equals(gteVersion(a, b), false, `${a} is < ${b}`)
  }
  ok(LasVersion.V1_1, LasVersion.V1_0)
  not(LasVersion.V1_0, LasVersion.V1_1)
  ok(LasVersion.V1_0, LasVersion.V1_0)
})
