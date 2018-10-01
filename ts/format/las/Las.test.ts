import fs from 'fs'
import path from 'path'
import { Las } from './Las'
import { FSFeed } from '../../reader/feed/FSFeed'
import { getAll } from '../../util/getAll'
import { LasVersion } from './LasVersion'

const DIR = `${__dirname}/_test/RandomSample/las`

test('Reading a v1d0 file', async () => {
  const feed = new FSFeed(fs, Buffer.allocUnsafe)
  const las = new Las(feed, path.normalize(`${DIR}/v1d0.las`))
  const tree = await las.getTree(null)
  expect(tree.version).toBe(LasVersion.V1_1)
  expect(tree.bounds).toMatchObject({
    max: {
      x: 1.9002189366343103e-109,
      y: -3.6667250033062965e+161,
      z: -9.603721404079678e-86
    },
    min: {
      x: 7.68816899563711e+284,
      y: 7.982469697199583e-157,
      z: -6.065988000075457e+66
    }
  })
  expect(tree.numPoints).toBe(10)
  const sets = await getAll(las.getPoints())
  expect(sets.length).toBe(1)
  for (const set of sets) {
    expect(set.node.numPoints).toBe(10)
    console.log(await getAll(set.points))
  }
})
