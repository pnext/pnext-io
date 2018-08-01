import IVector3 from '../api/IVector3'

export default function distancePointPoint (a: IVector3, b: IVector3): IVector3 {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z
  }
}
