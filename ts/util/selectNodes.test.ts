import { Box3, PerspectiveCamera, Vector3 } from 'three'
import INode from '../api/INode'
import INodeQuery from '../api/INodeQuery'
import IVector3 from '../api/IVector3'
import INodeTree from './INodeTree'
import getBoundingSphere from './getBoundingSphere'
import selectNodes from './selectNodes'

function createNode (name, points: IVector3[]) {
  const bounds = new Box3()
  for (const point of points) {
    bounds.expandByPoint(new Vector3(point.x, point.y, point.z))
  }
  return {
    name,
    numPoints: points.length,
    bounds,
    toString () {
      return `[Node#${this.name}]`
    }
  }
}

function createTreeNode (node: INode): INodeTree {
  return {
    node,
    boundingSphere: getBoundingSphere(node),
    children: null
  }
}

function createTreeNodes (nodes: INode[]): INodeTree[] {
  return nodes.map(createTreeNode)
}

function gatherNodes (output: INode[]) {
  return {
    isEndingOrEnded: () => false,
    write (node: INode): void {
      output.push(node)
    },
    end (error?: Error) {
      return
    }
  }
}

function box3 (a: IVector3, b: IVector3): Box3 {
  return new Box3(
    new Vector3(a.x, a.y, a.z),
    new Vector3(b.x, b.y, b.z)
  )
}

test('select everything on an empty list should just end', async () => {
  await selectNodes([], {
    isEndingOrEnded: () => false,
    write (node: INode): void {
      return
    }
  }, {})
})

function createABNodes () {
  return {
    a: createNode('a', [{ x:  .0, y:  .0, z:  .0 }, { x:  .5, y:  .5, z:  .5 }, { x:  1.0, y:  1.0, z:  1.0 }]),
    b: createNode('b', [{ x:  .0, y:  .0, z:  .0 }, { x: 2.0, y: 2.0, z: 2.0 }, { x:  5.0, y:  5.0, z:  5.0 }]),
    c: createNode('c', [{ x: 3.0, y: 3.0, z: 3.0 }, { x: 5.0, y: 5.0, z: 5.0 }, { x:  6.0, y:  6.0, z:  6.0 }]),
    d: createNode('d', [{ x: 5.0, y: 5.0, z: 5.0 }, { x: 7.0, y: 7.0, z: 7.0 }, { x: 10.0, y: 10.0, z: 10.0 }]),
    e: createNode('e', [{ x: 9.0, y: 9.0, z: 9.0 }, { x: 9.5, y: 9.5, z: 9.5 }, { x: 10.0, y: 10.0, z: 10.0 }])
  }
}

async function selectInABNodes (list: INode[], query: INodeQuery): Promise<INode[]> {
  const output: INode[] = []
  await selectNodes(
    createTreeNodes(list),
    gatherNodes(output),
    query
  )
  return output
}

test('select everything on a full list should return every entry, unsorted', async () => {
  const { a, b } = createABNodes()
  const output = await selectInABNodes([b, a, b], {})
  expect(output).toMatchObject([b, a, b]) // Nodes returned like before
})

test('selecting a point range should only return points within the range', async () => {
  const { a, b } = createABNodes()
  const output = await selectInABNodes([b, a, b], {
    pointRange: {
      max: 7
    }
  })
  expect(output).toMatchObject([b, a]) // limited to the first two blocks
})

test('the max range larger than the first node, should return empty set', async () => {
  const { a, b } = createABNodes()
  const output = await selectInABNodes([b, a, b], {
    pointRange: {
      max: 1
    }
  })
  expect(output).toMatchObject([]) // empty set returned
})

test('using minimum point range to limit the points', async () => {
  const { a, b } = createABNodes()
  const output = await selectInABNodes([b, a, b], {
    pointRange: {
      min: 1,
      max: 3
    }
  })
  expect(output).toMatchObject([b])
})

test('the minimum point range is lower equal', async () => {
  const { a, b } = createABNodes()
  const output = await selectInABNodes([b, a, b], {
    pointRange: {
      min: 4,
      max: 9
    }
  })
  expect(output).toMatchObject([a, b])
})

test('Only points in the cut should be returned', async () => {
  const { a, b, c, d, e } = createABNodes()
  const output = await selectInABNodes([e, d, c, b, a], {
    cut: [
      box3({ x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 })
    ]
  })
  expect(output).toMatchObject([b, a])
})

test('With multiple cuts, nodes that cut any of those should be returned', async () => {
  const { a, b, c, d, e } = createABNodes()
  const output = await selectInABNodes([e, d, c, b, a], {
    cut: [
      box3({ x:  .0, y:  .0, z:  .0 }, { x:  1.0, y:  1.0, z:  1.0 }),
      box3({ x: 9.0, y: 9.0, z: 9.0 }, { x: 10.0, y: 10.0, z: 10.0 })
    ]
  })
  expect(output).toMatchObject([e, d, b, a])
})

test('Only points in any of the multiple cut should be returned', async () => {
  const { a, b, c, d, e } = createABNodes()
  const output = await selectInABNodes([e, d, c, b, a], {
    display: [{ cam: new PerspectiveCamera() }]
  })
  expect(output).toMatchObject([a, b])
})
