import IBox3 from './IBox3'
import IVector3 from './IVector3'
import IFeature from './IFeature'
import PointClass from './PointClass'

export default interface ITree {
  id: string
  bounds: IBox3

  /**
   * The scale factor for this data. May be either a number, an array of length 3,
   * or may not be present at all in the case of absolutely positioned data.
   *
   * If scale is present, then absolutely positioned values for spatial coordinates
   * can be determined as absolutelyPositionedValue = serializedValue * scale + offset.
   */
  scale?: IVector3

  /**
   * The offset at which this data was indexed.
   * This value will not exist for absolutely positioned data.
   *
   * If offset is present, then absolutely positioned values for spatial coordinates
   * can be determined as absolutelyPositionedValue = serializedValue * scale + offset.
   *
   * Note that for a dataType of laszip, offset information must be read from the
   * LAZ header since individual files may be serialized with a local offset.
   */
  offset?: IVector3
  numPoints: (number | Long)

  /**
   * The narrowest bounds conforming to the maximal extents of the data.
   *
   * This value is always in native coordinate space, so any scale or offset
   * values will not have been applied.
   */
  boundsConforming?: IBox3
  schema: IFeature[]
  metadata?: { [k: string]: any }

  /**
   * Specificies all the classifications found in this tree, mapping
   * them to common PointClasses.
   *
   * This needs to happen because the classification allows for user-defined
   * classifications that exceed the common classification map.
   */
  classificationMap?: { [classification: number]: PointClass }
}
