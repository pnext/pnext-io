import { Vector3 } from 'three'
import IBox3 from '../api/IBox3'
import IVector3 from '../api/IVector3'
import distancePointPoint from './distancePointPoint'
import centerPointPoint from './centerPointPoint'
import ISphere from './ISphere'

export default function getBoundingSphere( box: IBox3, target: ISphere): void {
  centerPointPoint(box.max, box.min, target.center)
  target.radius = distancePointPoint( box.max, box.min ) * 0.5
}
