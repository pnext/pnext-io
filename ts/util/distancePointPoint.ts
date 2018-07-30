import IVector3 from '../api/IVector3'

export default function distancePointPoint (a: IVector3, b: IVector3): number {
  const A = a.x - b.x
  const B = a.y - b.y
  const C = a.z - b.z
  return Math.sqrt(A * A + B * B + C * C)
}
