import { IQuery, IQueryResponse, INodeRequest, INodeData } from './Types'
import { Stream } from 'stream'

export interface IQueryInterface {
  queryPoints (query: IQuery): Promise<IQueryResponse>
  getNodes (nodes: INodeRequest): Stream
}
