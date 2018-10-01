import ITree from '../../../api/ITree'
import { ILasHeader } from './readHeader'
import IBox3 from '../../../api/IBox3'
import { LasPointFormat, formatByVersion } from '../LasPointFormat'
import { LasVersion } from '../LasVersion'
import readerByFormat from '../point/readerByFormat'
import IFeature from '../../../api/IFeature'
import { FeatureObject } from '../../../api/FeatureType'
import IReader from '../../../reader/IReader'
import IPoint from '../../../api/IPoint'
import { unfixArray } from '../../../reader/util/fixedArray'
import { INodeLimit } from '../../../util/AbstractVirtualNodesIO'
import { ILasTree } from './ILasTree'

export type PointsByReturn = { [pointReturn: number]: number | Long }

function boundsFromHeader (header: ILasHeader): IBox3 {
  return {
    max: {
      x: header.maxX,
      y: header.maxY,
      z: header.maxZ
    },
    min: {
      x: header.minX,
      y: header.minY,
      z: header.minZ
    }
  }
}

function toFeatureArray (types: FeatureObject): IFeature[] {
  const arr = []
  for (const name in types) {
    arr.push({
      name,
      type: types[name]
    })
  }
  return arr
}

export function fromHeader (header: ILasHeader, location: string, nodeLimit: number = 1024): ILasTree {
  const { versionMajor, versionMinor, pdFormatId } = header
  const versionRaw = `V${header.versionMajor}_${header.versionMinor}`
  const version = LasVersion[versionRaw]
  if (version === undefined) {
    throw new Error(`Unsupported LAS version: ${versionRaw}`)
  }
  const supportedFormats = formatByVersion[version]
  if (!supportedFormats.includes(pdFormatId)) {
    throw new Error(`LAS version ${version} doesn't support type format: ${pdFormatId}`)
  }
  const pointReader = readerByFormat[pdFormatId]
  const pointsByReturn = unfixArray<number | Long>('numberOfPointsByReturn_', header, 15)
  return {
    id: `${location} - [LAS ${versionRaw}]`,
    bounds: boundsFromHeader(header),
    scale: { x: header.xScale, y: header.yScale, z: header.zScale },
    offset: { x: header.xOffset, y: header.yOffset, z: header.zOffset },
    numPoints: header.pointRecords,
    schema: toFeatureArray(pointReader.type),
    nodeLimit,
    metadata: {
      pdFormatId,
      versionMajor,
      versionMinor,
      generatingSoftware: header.generatingSoftware,
      systemIdentifier: header.systemIdentifier,
      pointsByReturn,
      guid1: header.guid1,
      guid2: header.guid2,
      guid3: header.guid3,
      guid4: header.guid4,
      flightDateJulian: header.flightDateJulian,
      year: header.year,
      headerSize: header.headerSize,
      offsetToData: header.offsetToData,
      numberOfVarRecords: header.numberOfExtVarRecords,
      pdRecordLength: header.pdRecordLength,
      waveFormStart: header.waveFormStart,
      firstExtVarLenRecord: header.firstExtVarLenRecord,
      numberOfExtVarRecords: header.numberOfExtVarRecords
    },
    version,
    pointReader,
    pointsByReturn,
    pointOffset: header.offsetToData
  }
}
