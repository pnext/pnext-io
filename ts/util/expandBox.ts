import IBox3 from '../api/IBox3'
import { Box3, Vector3 } from 'three'

export default function expandBox (boxA: IBox3, boxB: IBox3): Box3 {
  return new Box3(
    new Vector3(
      Math.min(boxA.min.x, boxB.min.x),
      Math.min(boxA.min.y, boxB.min.y),
      Math.min(boxA.min.z, boxB.min.z)
    ),
    new Vector3(
      Math.max(boxA.max.x, boxB.max.x),
      Math.max(boxA.max.y, boxB.max.y),
      Math.max(boxA.max.z, boxB.max.z)
    )
  )
}
