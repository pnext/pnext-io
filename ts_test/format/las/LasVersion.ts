#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import { LasVersion } from '../../../ts/format/las/LasVersion'

test('Version double check', async t => {
  t.deepEquals(Object.keys(LasVersion), [
    'V1_0', 'V1_1', 'V1_2', 'V1_3', 'V1_4'
  ], 'All Keys correct')

  t.deepEquals((Object as any).values(LasVersion), [
    '1.0', '1.1', '1.2', '1.3', '1.4'
  ], 'All Values correct')
})
