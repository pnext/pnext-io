import INode from '../api/INode'
import { Sphere } from 'three'

export default interface INodeTree {
  node: INode,
  boundingSphere: Sphere,
  children (): PromiseLike<INodeTree[]> | null
}
