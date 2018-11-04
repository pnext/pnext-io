import fs from 'fs'
import path from 'path'
import { Las } from './Las'
import { FSFeed } from '../../reader/feed/FSFeed'
import { getAll } from '../../util/getAll'
import { LasVersion } from './LasVersion'
import { toLocationFeed } from '../../reader/feed/toLocationFeed'

const DIR = `${__dirname}/_test/RandomSample/las`

for (const ver of [
  { version: LasVersion.V1_1, name: 'v1d0.las', pd: 0 },
  { version: LasVersion.V1_1, name: 'v1d1.las', pd: 1 },
  { version: LasVersion.V1_1, name: 'v1d2.las', pd: 2 },
  { version: LasVersion.V1_1, name: 'v1d3.las', pd: 3 },
  { version: LasVersion.V1_2, name: 'v2d0.las', pd: 0 },
  { version: LasVersion.V1_2, name: 'v2d1.las', pd: 1 },
  { version: LasVersion.V1_2, name: 'v2d2.las', pd: 2 },
  { version: LasVersion.V1_2, name: 'v2d3.las', pd: 3 },
  { version: LasVersion.V1_3, name: 'v3d0.las', pd: 0 },
  { version: LasVersion.V1_3, name: 'v3d1.las', pd: 1 },
  { version: LasVersion.V1_3, name: 'v3d2.las', pd: 2 },
  { version: LasVersion.V1_3, name: 'v3d3.las', pd: 3 },
  { version: LasVersion.V1_4, name: 'v4d0.las', pd: 0 },
  { version: LasVersion.V1_4, name: 'v4d1.las', pd: 1 },
  { version: LasVersion.V1_4, name: 'v4d2.las', pd: 2 },
  { version: LasVersion.V1_4, name: 'v4d3.las', pd: 3 },
  { version: LasVersion.V1_4, name: 'v4d6.las', pd: 6 },
  { version: LasVersion.V1_4, name: 'v4d7.las', pd: 7 },
  { version: LasVersion.V1_4, name: 'v4d8.las', pd: 8 }
]) {
  test(`Reading a ${ver.name} file`, async () => {
    const feed = new FSFeed(fs, Buffer.allocUnsafe)
    const las = new Las(toLocationFeed(feed, path.normalize(`${DIR}/${ver.name}`)))
    const tree = await las.getTree(null)
    expect(tree.version).toBe(ver.version)
    expect(tree.metadata.pdFormatId).toBe(ver.pd)
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
      await getAll(set.points)
    }
  })
}
