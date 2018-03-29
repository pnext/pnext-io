import { IQuery, IQueryResponse, INodeRequest, INodeData, ITree, ITreeQuery } from './Types'
import { Stream } from 'stream'

export interface IQueryInterface {
  queryPoints (query: IQuery): Promise<IQueryResponse>
  getTree (treeQuery: ITreeQuery): Promise<ITree>
  getNodes (nodes: INodeRequest): Stream
}
