import Long from 'long'
import { FeatureObject } from '../../../api/FeatureType'
import IReader from '../../../reader/IReader'
import { readFromStream } from '../../../reader/readFromStream'
import readerForReaders, { INamedReader } from '../../../reader/readerForReaders'
import double from '../../../reader/type/double'
import char from '../../../reader/type/fixedTrimmedString'
import unsignedShort from '../../../reader/type/uint16LE'
import unsignedLong from '../../../reader/type/uint32LE'
import unsignedLongLong from '../../../reader/type/uint64LE'
import unsignedChar from '../../../reader/type/uint8'
import { fixedArray } from '../../../reader/util/fixedArray'
import { mergedReader } from '../../../reader/util/mergedReader'
import { signature } from '../../../reader/util/signature'
import { getOne } from '../../../util/getOne'
import { LasVersion, gteVersion } from '../LasVersion'
import { IFeed } from '../../../reader/feed/IFeed'
import { ILocationFeed } from '../../../reader/feed/ILocationFeed'

function unsignedLongArray (length: number) {
  return fixedArray(unsignedLong, length)
}
function unsignedLongLongArray (length: number) {
  return fixedArray(unsignedLongLong, length)
}

const coreReader = readerForReaders<ILasHeader>([
  { reader: signature('LASF'), name: 'signature' },
  { reader: unsignedLong, name: 'reserved' },
  { reader: unsignedLong, name: 'guid1' },
  { reader: unsignedShort, name: 'guid2' },
  { reader: unsignedShort, name: 'guid3' },
  { reader: char(8), name: 'guid4' },
  { reader: unsignedChar, name: 'versionMajor' },
  { reader: unsignedChar, name: 'versionMinor' },
  { reader: char(32), name: 'systemIdentifier' },
  { reader: char(32), name: 'generatingSoftware' },
  { reader: unsignedShort, name: 'flightDateJulian' },
  { reader: unsignedShort, name: 'year' },
  { reader: unsignedShort, name: 'headerSize' },
  { reader: unsignedLong, name: 'offsetToData' },
  { reader: unsignedLong, name: 'numberOfVarRecords' },
  { reader: unsignedChar, name: 'pdFormatId' /* Point Data Format ID (0-99 for spec) */ },
  { reader: unsignedShort, name: 'pdRecordLength' },
  { reader: unsignedLong, name: 'pointRecords' },
  { reader: unsignedLongArray(5), name: 'numberOfPointsByReturn_' },
  { reader: double, name: 'xScale' },
  { reader: double, name: 'yScale' },
  { reader: double, name: 'zScale' },
  { reader: double, name: 'xOffset' },
  { reader: double, name: 'yOffset' },
  { reader: double, name: 'zOffset' },
  { reader: double, name: 'maxX' },
  { reader: double, name: 'minX' },
  { reader: double, name: 'maxY' },
  { reader: double, name: 'minY' },
  { reader: double, name: 'maxZ' },
  { reader: double, name: 'minZ' }
])

export interface ILasHeader {
  signature: string,
  reserved: number | Long,
  guid1: number | Long,
  guid2: number,
  guid3: number,
  guid4: string,
  versionMajor: number,
  versionMinor: number,
  systemIdentifier: string,
  generatingSoftware: string,
  flightDateJulian: number,
  year: number,
  headerSize: number,
  offsetToData: number | Long,
  numberOfVarRecords: number | Long,
  pdFormatId: number,
  pdRecordLength: number,
  pointRecords: number | Long,
  numberOfPointsByReturn_0: number | Long,
  numberOfPointsByReturn_1: number | Long,
  numberOfPointsByReturn_2: number | Long,
  numberOfPointsByReturn_3: number | Long,
  numberOfPointsByReturn_4: number | Long,
  numberOfPointsByReturn_5: number | Long,
  numberOfPointsByReturn_6: number | Long,
  numberOfPointsByReturn_7: number | Long,
  numberOfPointsByReturn_8: number | Long,
  numberOfPointsByReturn_9: number | Long,
  numberOfPointsByReturn_10: number | Long,
  numberOfPointsByReturn_11: number | Long,
  numberOfPointsByReturn_12: number | Long,
  numberOfPointsByReturn_13: number | Long,
  numberOfPointsByReturn_14: number | Long,
  xScale: number,
  yScale: number,
  zScale: number,
  xOffset: number,
  yOffset: number,
  zOffset: number,
  maxX: number,
  minX: number,
  maxY: number,
  minY: number,
  maxZ: number,
  minZ: number,
  waveFormStart?: number | Long,
  firstExtVarLenRecord?: number | Long,
  numberOfExtVarRecords: number | Long,
}

const Las13ExtArr: INamedReader<any>[] = [
  // Start of Waveform Data Packet Record - ulonglong
  { name: 'waveFormStart', reader: unsignedLongLong }
]

const Las13Ext = readerForReaders(Las13ExtArr)

const Las14Ext = readerForReaders(
  Las13ExtArr.concat([
    // Start of first Extended Variable Length Record - ulonglong
    { name: 'firstExtVarLenRecord', reader: unsignedLongLong },
    // Number of Extended Variable Length Records - ulonglong
    { name: 'numberExtVarLenRecord', reader: unsignedLong },
    // Number of point records - ulong
    { name: 'pointRecords', reader: unsignedLongLong },
    // Number of points by return - ulonglong[15]
    { name: 'numberOfPointsByReturn_', reader: unsignedLongLongArray(15) }
  ])
)

const headerReader: IReader<ILasHeader, FeatureObject> = mergedReader<ILasHeader, ILasHeader>(coreReader, coreData => {
  const versionStr = `V${coreData.versionMajor}_${coreData.versionMinor}`
  const version = LasVersion[versionStr]
  if (gteVersion(version, LasVersion.V1_4)) {
    return Las14Ext
  }
  // Las < 1.4 only supports up to 5 returns.
  // This fills up the rest
  coreData.numberOfPointsByReturn_5 = 0
  coreData.numberOfPointsByReturn_6 = 0
  coreData.numberOfPointsByReturn_7 = 0
  coreData.numberOfPointsByReturn_8 = 0
  coreData.numberOfPointsByReturn_9 = 0
  coreData.numberOfPointsByReturn_10 = 0
  coreData.numberOfPointsByReturn_11 = 0
  coreData.numberOfPointsByReturn_12 = 0
  coreData.numberOfPointsByReturn_13 = 0
  coreData.numberOfPointsByReturn_14 = 0
  // Las < 1.4 doesn't support Extended Variable records
  coreData.numberOfExtVarRecords = 0
  coreData.firstExtVarLenRecord = 0
  if (gteVersion(version, LasVersion.V1_3)) {
    return Las13Ext
  }
  // Las < 1.3 doesn't support waveforms
  coreData.waveFormStart = 0
  return null
}, {
  ...coreReader.type,
  ...Las14Ext.type
})

export function readHeader (feed: ILocationFeed): Promise<ILasHeader> {
  return getOne(
    readFromStream<ILasHeader>(
      feed.createReadStream({ start: 0 }),
      headerReader
    )
  )
}
