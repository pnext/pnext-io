import Query from './Query'
import QueryResponse from './QueryResponse'

export interface QueryInterface {
    async queryPoints (query: Query): QueryResponse
    getNodes (nodes: NodeRequest): NodeData
}