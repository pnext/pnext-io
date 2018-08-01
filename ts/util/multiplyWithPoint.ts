import IVector3 from '../api/IVector3'

export default function multiplyWithPoint (toPoint: IVector3, multiply: IVector3): IVector3 {
  toPoint.x *= multiply.x
  toPoint.y *= multiply.y
  toPoint.z *= multiply.z
  return toPoint
}
