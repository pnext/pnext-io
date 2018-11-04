export interface IVarLengthRecord {
  signature: number,
  userId: string,
  recordId: number,
  bytesLength: number,
  description: string,
  bytes: ArrayBuffer
}
