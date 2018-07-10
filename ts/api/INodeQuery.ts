import INodeQueryItem from './INodeQueryItem'
import IFeature from './IFeature'

export default interface INodeQuery {
  nodes: INodeQueryItem[]
  schema?: IFeature[]
}
