import IBox3 from '../api/IBox3'
import boxIntersectsBox from './boxIntersectsBox'

export default function boxIntersectsOneBox (bounds: IBox3, cutList: IBox3[]): boolean {
  for (const cut of cutList) {
    if (boxIntersectsBox(bounds, cut)) {
      return true
    }
  }
  return false
}
