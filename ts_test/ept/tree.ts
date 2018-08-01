#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import loadTree from '../../ts/format/ept/tree'
import IInput from '../../ts/format/IInput'
import FeatureType from '../../ts/api/FeatureType'
import Feature from '../../ts/api/Feature'

test('loadTree', async t => {
  const testInput: IInput = {
    id: (): string => 'abcd',
    loadJson: async (filename: string): Promise<any> => {
      t.equals(filename, 'entwine.json', 'root filename is entwine.json')
      return {
        bounds: [0, 0, 0, 1, 1, 1],
        boundsConforming: [0.2, 0.2, 0.2, 0.8, 0.8, 0.8],
        scale: 0.5,
        offset: [4, 5, 6],
        numPoints: 10,
        schema: [
          { type: 'uint32', name: 'fancy' },
          { type: 'double', name: 'x' }
        ],
        hierarchyStep: 5,
        hierarchyType: 'json',
        reprojection: 'raspy',
        dataType: 'laszip',
        srs: 'fancysrs',
        ticks: 5,
        metadata: {
          fancy: true
        }
      }
    }
  }
  const tree = await loadTree(testInput)
  t.deepEquals(tree, {
    id: 'abcd',
    bounds: {
      min: { x: 0, y: 0, z: 0 },
      max: { x: 1, y: 1, z: 1 }
    },
    boundsConforming: {
      min: { x: 0.2, y: 0.2, z: 0.2 },
      max: { x: 0.8, y: 0.8, z: 0.8 }
    },
    scale: 0.5,
    offset: { x: 4, y: 5, z: 6 },
    numPoints: 10,
    schema: [
      { type: FeatureType.uint32, name: 'fancy' },
      Feature.x
    ],
    metadata: {
      fancy: true,
      reprojection: 'raspy',
      dataType: 'laszip',
      srs: 'fancysrs',
      ticks: 5,
      hierarchyStep: 5,
      hierarchyType: 'json'
    }
  })
})
