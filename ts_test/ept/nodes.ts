#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import loadRootNodes from '../../ts/format/ept/nodes'
import IInput from '../../ts/format/IInput'
import FeatureType from '../../ts/api/FeatureType'
import Feature from '../../ts/api/Feature'
import ITree from '../../ts/api/ITree'

test('Basic nodes loading test', async t => {
  const fileOrder = [
    '0-0-0-0.json'
  ]
  const input = {
    id () { return 'abcd' },
    async loadJson (filename: string): Promise<any> {
      if (fileOrder.length === 0) {
        t.fail(`Loading ${filename} even though it wasn't expected`)
      }
      const next = fileOrder.shift()
      if (next !== filename) {
        t.fail(`Loading order ${filename} was requested but ${next}`)
      }
      return {
        '0-0-0-0': 12,
        '1-0-0-0': 10,
        '1-0-1-0': 2
      }
    }
  }
  const tree: ITree = {
    id: 'abcd',
    bounds: { min: { x: 1, y: 2, z: 3 }, max: { x: 4, y: 5, z: 6 } },
    numPoints: 100,
    schema: [],
    metadata: {
      hierarchyStep: 5
    }
  }
  const nodes = await loadRootNodes(input, tree)
  t.deepEquals(nodes[0].node.bounds, {
    min: { x: 1, y: 2, z: 3 },
    max: { x: 2.5, y: 3.5, z: 4.5 }
  })
})
