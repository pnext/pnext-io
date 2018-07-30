import INodeQuery from '../api/INodeQuery'
import INode from '../api/INode'
import INodeTree from './INodeTree'
import ITree from '../api/ITree'
import { Frustum, Matrix4, PerspectiveCamera, Sphere } from 'three'
import boxIntersectsFrustum from './boxIntersectsFrustum'
import boxIntersectsBox from './boxIntersectsBox'
import distancePointPoint from './distancePointPoint'
import IPerspectiveCamera from '../api/IPerspectiveCamera'
import boundingSphere from './boundingSphere'
import IBox3 from '../api/IBox3'
import IRange from '../api/IRange'
import { getMaxListeners } from 'cluster'
import inRange from './inRange'
import IDisplay from '../api/IDisplay';
import ILongRange from '../api/ILongRange';
import Long from 'long';

function getPerspectiveCamera (input: IPerspectiveCamera): PerspectiveCamera {
  if (input instanceof PerspectiveCamera) {
    return input
  }
  const camera = new PerspectiveCamera()
  // https://stackoverflow.com/a/29223836
  camera.matrix.fromArray(input.matrix.elements as number[])
  camera.matrix.decompose(camera.position, camera.quaternion, camera.scale)
  return camera
}

function getMatrix4 (cam: IPerspectiveCamera): Matrix4 {
  if (cam.matrix instanceof Matrix4) {
    return cam.matrix
  }
  const matrix = new Matrix4()
  const elem = matrix.elements
  matrix.set(
    elem[ 0], elem[ 1], elem[ 2], elem[ 3],
    elem[ 4], elem[ 5], elem[ 6], elem[ 7],
    elem[ 8], elem[ 9], elem[10], elem[11],
    elem[12], elem[13], elem[14], elem[15]
  )
  return matrix
}

function getFrustumFromCam (cam: IPerspectiveCamera) {
  const f = new Frustum()
  f.setFromMatrix(getMatrix4(cam))
  return f
}

function getScreenPixelRatio (f: number, radius: number, distance: number): number {
  return (radius * f) / distance
}

function getWeight (node: INodeTree, fDisplays?: IFrustumDisplay[]): number {
  let weight = 0
  for (const fDisplay of fDisplays) {
    const distance = distancePointPoint(node.boundingSphere.center, fDisplay.cam.position)
    const screenPixelRatio = getScreenPixelRatio(
      fDisplay.f,
      node.boundingSphere.radius,
      distance
    )
    if (fDisplay.normalDensity && !inRange(fDisplay.normalDensity, screenPixelRatio)) {
      continue;
    }
    if (distance < node.boundingSphere.radius) {
      // Definitely load items within the sphere
      return Number.MAX_VALUE
    } else if (weight < screenPixelRatio) {
      // The biggest screenPixelRadius wins 
      weight = screenPixelRatio
    }
  }
  return weight
}

interface IOutput {
  addNode: (node: INode) => void,
  isClosed: () => boolean,
  end: () => void
}

interface IFrustumDisplay {
  frustum: Frustum,
  cam: PerspectiveCamera,
  display: IDisplay,
  f: number,
  normalDensity?: IRange
}

interface IWeightedNode {
  weight: number,
  node: INodeTree
}

function boxIntersectsOneBox (bounds: IBox3, cutList: IBox3[]): boolean {
  for (const cut of cutList) {
    if (boxIntersectsBox(bounds, cut)) {
      return true
    }
  }
  return false
}

function boxIntersectsOneFrustum (bounds: IBox3, fDisplays: IFrustumDisplay[]): boolean {
  for (const fDisplay of fDisplays) {
    if (boxIntersectsFrustum(bounds, fDisplay.frustum)) {
      return true
    }
  }
  return false
}

function sortByWeight (a: IWeightedNode, b: IWeightedNode): number {
  if (a.weight > b.weight) return 1
  if (a.weight < b.weight) return -1
  return 0
}

function normalizeDensity (density?: IRange, height?:number): IRange | null {
  if (!density) {
    return null
  }
  if (isNaN(height)) {
    return density
  }
  let min = density.min
  if (!isNaN(min)) {
    min = min / height
  }
  return {
    min,
    max: density.max / height
  }
}

function getFrustumDisplays (display?: IDisplay[]): IFrustumDisplay[] | null {
  if (!display) {
    return null
  }

  return display.map(display => {
    const cam = getPerspectiveCamera(display.cam)
    const slope = Math.tan(cam.fov * Math.PI / 180)
    const frustum = getFrustumFromCam(display.cam)
    const f = 1 / slope
    return {
      f,
      frustum,
      cam,
      display,
      normalDensity: normalizeDensity(display.density, display.density.height)
    }
  })
}

function filterInvisibleNodes (nodeList: INodeTree[], cut?: IBox3[], fDisplays?: IFrustumDisplay[]): INodeTree[] {
  return nodeList
    .filter(({ node }) => {
      if (cut && !boxIntersectsOneBox(node.bounds, cut)) {
        return false
      }
      if (fDisplays && !boxIntersectsOneFrustum(node.bounds, fDisplays)) {
        return false
      }
      return true
    })
}

function filterAndSortByWeight (nodeList: INodeTree[], fDisplays: IFrustumDisplay[]): INodeTree[] {
  return nodeList.map(node => {
    return {
      weight: getWeight(node, fDisplays),
      node
    }
  })
    .filter(weightedNode => weightedNode.weight > 0)
    .sort(sortByWeight)
    .map(weightedNode => weightedNode.node)
}

function allChildren (nodeList: INodeTree[]): INodeTree[] | null {
  const childrenList = nodeList.map(node => node.children).filter(Boolean)
  if (childrenList.length === 0) {
    return null
  }
  // flatten
  return [].concat.apply([], childrenList)
}

function minLong (range?: ILongRange): Long | number {
  if (!range) {
    return 0
  }
  if (range.min === null || range.min === undefined) {
    return 0
  }
  return range.min
}

export default async function selectNodes (query: INodeQuery, treeNodeList: INodeTree[], output: IOutput): Promise<boolean> {
  let fDisplays: IFrustumDisplay[] | null = getFrustumDisplays(query.display)
  let totalPoints: Long = new Long(0)
  const min: Long | number = minLong(query.pointRange)
  
  while (treeNodeList) {
    if (query.cut || fDisplays) {
      treeNodeList = filterInvisibleNodes(treeNodeList, query.cut, fDisplays)
      if (fDisplays) {
        treeNodeList = filterAndSortByWeight(treeNodeList, fDisplays)
      }
    }
    for (const node of treeNodeList) {
      if (output.isClosed()) {
        return false
      }
      if (query.pointRange) {
        totalPoints = totalPoints.add(node.node.numPoints)
        if (totalPoints.greaterThan(query.pointRange.max)) {
          output.end()
          return true
        }
        if (totalPoints.lessThan(min)) {
          continue
        }
      }
      output.addNode(node.node)
    }
    treeNodeList = allChildren(treeNodeList)
  }
  output.end()
  return true
}
