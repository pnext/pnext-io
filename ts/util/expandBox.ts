import IBox3 from '../api/IBox3'

export default function expandBox (boxA: IBox3, boxB: IBox3): IBox3 {
  return {
    min: {
      x: Math.min(boxA.min.x, boxB.min.x),
      y: Math.min(boxA.min.y, boxB.min.y),
      z: Math.min(boxA.min.z, boxB.min.z)
    },
    max: {
      x: Math.max(boxA.max.x, boxB.max.x),
      y: Math.max(boxA.max.y, boxB.max.y),
      z: Math.max(boxA.max.z, boxB.max.z)
    }
  }
}
