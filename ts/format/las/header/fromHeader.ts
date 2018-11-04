import { ILasHeader } from './readHeader'
import IBox3 from '../../../api/IBox3'
import { formatByVersion } from '../LasPointFormat'
import { LasVersion } from '../LasVersion'
import readerByFormat from '../point/readerByFormat'
import IFeature from '../../../api/IFeature'
import { FeatureObject } from '../../../api/FeatureType'
import { unfixArray } from '../../../reader/util/fixedArray'
import { ILasTree } from './ILasTree'
import { IVarLengthRecord } from './IVarLengthRecord'
import { ICompression } from './ICompression'
import { getCompression } from './getCompression'

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

function isCompressed (pdFormatId: number) {
  const compressed = (pdFormatId & 0x80) === 0x80
  if (compressed) {
    pdFormatId = pdFormatId & 0x7F
  }
  return { compressed, pdFormatId }
}

export async function fromHeader (
  rawHeader: ILasHeader,
  varLenRecords: IVarLengthRecord[],
  location: string,
  nodeLimit?: number
): Promise<ILasTree> {
  const { versionMajor, versionMinor } = rawHeader
  const versionRaw = `V${rawHeader.versionMajor}_${rawHeader.versionMinor}`
  const version = LasVersion[versionRaw]
  if (version === undefined) {
    throw new Error(`Unsupported LAS version: ${versionRaw}`)
  }
  const { pdFormatId, compressed } = isCompressed(rawHeader.pdFormatId)
  const supportedFormats = formatByVersion[version]
  if (!supportedFormats.includes(pdFormatId)) {
    throw new Error(`LAS version ${version} doesn't support type format: ${pdFormatId}`)
  }
  const pointReader = readerByFormat[pdFormatId]
  const pointsByReturn = unfixArray<number | Long>('numberOfPointsByReturn_', rawHeader, 15)
  let compression: ICompression
  if (compressed) {
    compression = getCompression(varLenRecords)
    if (nodeLimit !== undefined) {
      throw new Error(`Las header contains the nodeLimit(${nodeLimit}), which may not be set as a compressed file is already pre-chunked.`)
    }
    // The Chunks-size needs to match the LAZ chunk-size
    nodeLimit = compression.chunkSize
  } else {
    nodeLimit = 1024
  }
  return {
    id: `${location} - [LAS ${versionRaw}]`,
    bounds: boundsFromHeader(rawHeader),
    scale: { x: rawHeader.xScale, y: rawHeader.yScale, z: rawHeader.zScale },
    offset: { x: rawHeader.xOffset, y: rawHeader.yOffset, z: rawHeader.zOffset },
    numPoints: rawHeader.pointRecords,
    schema: toFeatureArray(pointReader.type),
    nodeLimit,
    metadata: {
      pdFormatId,
      versionMajor,
      versionMinor,
      generatingSoftware: rawHeader.generatingSoftware,
      systemIdentifier: rawHeader.systemIdentifier,
      pointsByReturn,
      guid1: rawHeader.guid1,
      guid2: rawHeader.guid2,
      guid3: rawHeader.guid3,
      guid4: rawHeader.guid4,
      flightDateJulian: rawHeader.flightDateJulian,
      year: rawHeader.year,
      headerSize: rawHeader.headerSize,
      offsetToData: rawHeader.offsetToData,
      pdRecordLength: rawHeader.pdRecordLength,
      waveFormStart: rawHeader.waveFormStart,
      firstExtVarLenRecord: rawHeader.firstExtVarLenRecord,
      numberOfExtVarRecords: rawHeader.numberOfExtVarRecords
    },
    version,
    pointReader,
    pointsByReturn,
    pointOffset: rawHeader.offsetToData,
    varLenRecords,
    compression
  }
}
