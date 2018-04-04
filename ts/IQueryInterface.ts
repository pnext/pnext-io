import { IQuery, IQueryResponse, INodeRequest, INodeData, ITree, ITreeQuery } from './Types'
import { Readable } from 'stream'

export default interface IQueryInterface {
  queryPoints (query: IQuery): Promise<IQueryResponse>
  getTree (treeQuery: ITreeQuery): Promise<ITree>
  getNodes (nodes: INodeRequest): Readable
}
