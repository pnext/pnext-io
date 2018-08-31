import IBox3 from '../api/IBox3'
import IFrustum from './IFrustum'
import boxIntersectsFrustum from './boxIntersectsFrustum'

export default function boxIntersectsOneFrustum (bounds: IBox3, frustums: IFrustum[]): boolean {
  for (const frustum of frustums) {
    if (boxIntersectsFrustum(bounds, frustum)) {
      return true
    }
  }
  return false
}
