import IFrustum from './IFrustum'
import IRange from './IRange'
import IBox3 from './IBox3'

export default interface INodeQuery {
  frustum: IFrustum
  relevance?: IRange
  density?: IRange
  cut?: IBox3
}
