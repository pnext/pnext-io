import IFrustum from './IFrustum'
import IRange from './IRange'
import IBox3 from './IBox3'

export default interface INodeQuery {
  frustum: IFrustum
  relevance?: IRange
  density?: IRange

  /**
   * Multiple cut boxes.
   * 
   * Cut boxes are additive: If a node intersects
   * with any cut box it will be returned.
   */
  cut?: IBox3[]
}
