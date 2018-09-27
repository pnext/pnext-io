import IReader from './IReader'

export default interface IDynamicReader <ReaderType, FollowReaderType = any> {
  reader: IReader<ReaderType>,
  next (count: number, previous: ReaderType): IDynamicReader<FollowReaderType>
}
