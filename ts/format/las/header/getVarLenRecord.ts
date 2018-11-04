import { IVarLengthRecord } from './IVarLengthRecord'

export function getVarLenRecord (records: IVarLengthRecord[], selector: {
  userId?: string,
  description?: string,
  recordId?: number
}): IVarLengthRecord {
  for (const record of records) {
    if (selector.userId && record.userId !== selector.userId) {
      continue
    }
    if (selector.description && record.description !== selector.description) {
      continue
    }
    if (selector.recordId && record.recordId !== selector.recordId) {
      continue
    }
    return record
  }
  return null
}
