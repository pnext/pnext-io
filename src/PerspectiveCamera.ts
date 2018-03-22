import { Vector3 } from 'three';

export default interface PerspectiveCamera {
  pos: Vector3,
  fov: Number,
  aspect: Number,
  near: Number,
  far: Number
}
