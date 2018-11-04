import { ILocationFeed } from '../../../reader/feed/ILocationFeed'
import readerForReaders, { convertToObjectReader } from '../../../reader/readerForReaders'
import { readFromStream } from '../../../reader/readFromStream'
import fixedBytes from '../../../reader/type/fixedBytes'
import char from '../../../reader/type/fixedTrimmedString'
import unsignedShort from '../../../reader/type/uint16LE'
import { mergedReader } from '../../../reader/util/mergedReader'
import { getAll } from '../../../util/getAll'
import { assertNumber } from '../../../util/long/assertNumber'
import { IVarLengthRecord } from './IVarLengthRecord'
import { ILasHeader } from './readHeader'

const readHeader = readerForReaders<IVarLengthRecord>([
  { name: 'signature', reader: unsignedShort },
  { name: 'userId', reader: char(16) },
  { name: 'recordId', reader: unsignedShort },
  { name: 'bytesLength', reader: unsignedShort },
  { name: 'description', reader: char(32) }
])

function bytesReader (length) {
  return convertToObjectReader('bytes', fixedBytes(length))
}

const reader = mergedReader<IVarLengthRecord, any>(readHeader,
  header => bytesReader(header.bytesLength),
  null /* Type not so important */
)

export function readVarLenRecords (feed: ILocationFeed, rawHeader: ILasHeader): Promise<IVarLengthRecord[]> {
  return getAll(readFromStream(feed.createReadStream({
    start: rawHeader.headerSize,
    end: assertNumber(rawHeader.offsetToData)
  }), reader))
}
