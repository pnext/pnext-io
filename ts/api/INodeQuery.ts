import IDisplay from './IDisplay'
import ILongRange from './ILongRange'
import IBox3 from './IBox3'

export default interface INodeQuery {
  display?: IDisplay[]
  pointRange?: ILongRange

  /**
   * Multiple cut boxes.
   *
   * Cut boxes are additive: If a node intersects
   * with any cut box it will be returned.
   */
  cut?: IBox3[]
}
