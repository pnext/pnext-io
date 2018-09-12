import IFrustum from './IFrustum'
import INode from '../api/INode'
import IBox3 from '../api/IBox3'
import boxIntersectsOneBox from './boxIntersectsOneBox'
import boxIntersectsOneFrustum from './boxIntersectsOneFrustum'

export default function isBoundsVisible (cut?: IBox3[], frustums?: IFrustum[]): ((bounds: IBox3) => boolean) | undefined {
  if (cut && frustums) {
    return (bounds: IBox3) => boxIntersectsOneBox(bounds, cut) && boxIntersectsOneFrustum(bounds, frustums)
  }
  if (cut) {
    return (bounds: IBox3) => boxIntersectsOneBox(bounds, cut)
  }
  if (frustums) {
    return (bounds: IBox3) => boxIntersectsOneFrustum(bounds, frustums)
  }
}
