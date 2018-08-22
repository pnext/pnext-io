export default interface IDynamicContext {
  data: any // previous data before read, current data after read
  size: number // size of the previous data before read, size of the current data after read
  byteOffset: number // start byte offset before read, end byte offset after read
}
