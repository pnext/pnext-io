import IFrustum from './IFrustum'
import INode from '../api/INode'
import IBox3 from '../api/IBox3'
import boxIntersectsOneBox from './boxIntersectsOneBox'
import boxIntersectsOneFrustum from './boxIntersectsOneFrustum'

export default function isNodeVisible (cut?: IBox3[], frustums?: IFrustum[]): ((node: INode) => boolean) | undefined {
  if (cut && frustums) {
    return (node: INode) => boxIntersectsOneBox(node.bounds, cut) && boxIntersectsOneFrustum(node.bounds, frustums)
  }
  if (cut) {
    return (node: INode) => boxIntersectsOneBox(node.bounds, cut)
  }
  if (frustums) {
    return (node: INode) => boxIntersectsOneFrustum(node.bounds, frustums)
  }
}
