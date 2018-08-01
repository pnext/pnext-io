import IVector3 from '../api/IVector3'

export default function addToPoint (toPoint: IVector3, add: IVector3): IVector3 {
  toPoint.x += add.x
  toPoint.y += add.y
  toPoint.z += add.z
  return toPoint
}
