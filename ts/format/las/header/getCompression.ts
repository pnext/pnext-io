import { getVarLenRecord } from './getVarLenRecord'
import { ICompression } from './ICompression'
import { IVarLengthRecord } from './IVarLengthRecord'
import { compressionHeader, compressionItem } from './readCompression'

export function getCompression (varLenRecords: IVarLengthRecord[]): ICompression {
  const compressRec = getVarLenRecord(varLenRecords, {
    userId: 'laszip encoded',
    recordId: 22204
  })
  if (compressRec === null) {
    throw new Error(`This las file is compressed but there is no encoding specification found in the header.`)
  }
  if (compressRec.bytesLength < compressionHeader.minSize) {
    throw new Error(`Not enough bytes in the laszip header for the core header.`)
  }
  const view = new DataView(compressRec.bytes)
  const compression = compressionHeader.read(view, 0)
  let byteOffset = compressionHeader.minSize
  compression.items = new Array(2)
  let totalBytes = 0
  for (let i = 0; i < compression.numItems; i++) {
    if (compressRec.bytesLength < byteOffset + compressionItem.minSize) {
      throw new Error(`Not enough bytes in laszip header for item #${i}. Expected=${byteOffset + compressionItem.minSize} Got=${compressRec.bytesLength}`)
    }
    const item = compressionItem.read(view, byteOffset)
    totalBytes += item.size
    compression.items[i] = item
    byteOffset += compressionItem.minSize
  }
  return compression
}
