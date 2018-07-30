import boundingSphere from './boundingSphere'
import INode from '../api/INode'
import { Sphere } from 'three'

export default function getBoundingSphere (node: INode): Sphere {
  const sphere = new Sphere()
  boundingSphere(node.bounds, sphere)
  return sphere
}
