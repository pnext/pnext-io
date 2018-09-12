import INodeSelector from './INodeSelector'
import IFeature from './IFeature'

export default interface IPointQuery {
  nodes?: INodeSelector[]
  schema?: IFeature[]
}
