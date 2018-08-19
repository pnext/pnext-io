import { slippyToString, SlippyMap, parseSlippy, slippyParentString, slippyBounds, slippySphere, SLIPPY_ZERO } from '../../util/slippy'
import INodeTree from '../../util/INodeTree'
import ITree from '../../api/ITree'
import IInput from '../IInput'
import IBox3 from '../../api/IBox3'
import dot from '../../util/dot'
import addToPoint from '../../util/addToPoint'
import differencePointPoint from '../../util/differencePointPoint'
import multiplyWithPoint from '../../util/multiplyWithPoint'
import IVector3 from '../../api/IVector3'
import ISphere from '../../util/ISphere'
import distancePointPoint from '../../util/distancePointPoint'

function nullOp (): null {
  return null
}

interface INodeInfo {
  size: IVector3
  offset: IVector3
  sphereRadius: number
  hierarchyStep: number
  ticks: number
}

function scaleAndOffset (point: IVector3, nodeInfo: INodeInfo): IVector3 {
  return addToPoint(multiplyWithPoint(point, nodeInfo.size), nodeInfo.offset)
}

function eptSpacing (loc: SlippyMap, nodeInfo: INodeInfo): number {

}

function eptBounds (loc: SlippyMap, nodeInfo: INodeInfo): IBox3 {
  const bounds = slippyBounds(loc)
  scaleAndOffset(bounds.min, nodeInfo)
  scaleAndOffset(bounds.max, nodeInfo)
  return bounds
}

function eptSphere (loc: SlippyMap, nodeInfo: INodeInfo): ISphere {
  const sphere = slippySphere(loc)
  sphere.radius *= nodeInfo.sphereRadius
  scaleAndOffset(sphere.center, nodeInfo)
  return sphere
}

async function loadNodes (input: IInput, parent: SlippyMap, parentId: string, nodeInfo: INodeInfo): Promise<INodeTree[]> {
  const id = slippyToString(parent)
  const byParent: { [k: string]: (INodeTree[] | undefined) } = {}
  const children: INodeTree[] = []
  byParent[parentId] = children
  const dmax: number = parent.d + nodeInfo.hierarchyStep
  const counts: { [k: string]: number } = await input.loadJson(`${id}.json`)
  for (const childId in counts) {
    const numPoints = counts[childId]
    const loc = parseSlippy(childId)
    const parentId = slippyParentString(loc)
    let siblings = byParent[parentId]
    if (siblings === undefined) {
      siblings = []
      byParent[parentId] = siblings
    }
    const nodeTree: INodeTree = {
      node: {
        numPoints,
        bounds: eptBounds(loc, nodeInfo),
        spacing: eptSpacing(loc, nodeInfo)
      },
      boundingSphere: eptSphere(loc, nodeInfo),
      children: nullOp
    }
    if (loc.d === dmax) {
      let subChildren: Promise<INodeTree[]>
      nodeTree.children = (): Promise<INodeTree[]> => {
        if (!subChildren) {
          subChildren = loadNodes(input, loc, childId, nodeInfo)
        }
        return subChildren
      }
    }
    siblings.push(nodeTree)
  }
  return children
}

export default function loadRootNodes (input: IInput, tree: ITree): Promise<INodeTree[]> {
  // There is no deeper hierarchy step
  let hierarchyStep = Infinity
  if (tree.metadata && !isNaN(tree.metadata.hierarchyStep)) {
    hierarchyStep = tree.metadata.hierarchyStep
  }
  if (tree.metadata && tree.metadata.hierarchyType && tree.metadata.hierarchyType !== 'json') {
    throw new Error('Only supported hierarchy type is json')
  }
  const nodeInfo = {
    size: differencePointPoint(tree.bounds.max, tree.bounds.min),
    sphereRadius: distancePointPoint(tree.bounds.max, tree.bounds.min),
    offset: tree.bounds.min,
    hierarchyStep,
    ticks: tree.metadata.ticks
  }
  return loadNodes(input, SLIPPY_ZERO, '0-0-0-0', nodeInfo)
}
