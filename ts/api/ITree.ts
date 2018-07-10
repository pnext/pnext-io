import IBox3 from './IBox3'
import IVector3 from './IVector3'
import IFeature from './IFeature'

export default interface ITree {
  id: string
  bounds: IBox3
  scale?: IVector3
  offset?: IVector3
  numPoints?: (number | Long)
  boundsConforming?: IBox3
  schema: IFeature[]
  metadata?: { [k: string]: any }
}
