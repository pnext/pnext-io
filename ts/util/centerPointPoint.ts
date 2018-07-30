import IBox3 from "../api/IBox3";
import IVector3 from "../api/IVector3";

export default function centerPointPoint (a: IVector3, b: IVector3, target: IVector3): void {
  target.x = a.x + (a.x - b.x) * .5
  target.z = a.z + (a.z - b.z) * .5
  target.y = a.y + (a.y - b.y) * .5
}
