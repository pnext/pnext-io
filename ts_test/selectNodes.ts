#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import selectNodes from '../ts/util/selectNodes'
import INode from '../ts/api/INode'
import INodeTree from '../ts/util/INodeTree'
import INodeQuery from '../ts/api/INodeQuery'
import IVector3 from '../ts/api/IVector3'
import { Box3, Vector3, PerspectiveCamera } from 'three'
import getBoundingSphere from '../ts/util/getBoundingSphere'

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
    children: () => null
  }
}

function createTreeNodes (nodes: INode[]): INodeTree[] {
  return nodes.map(createTreeNode)
}

function gatherNodes (output: INode[]) {
  return {
    isClosed: () => false,
    addNode (node: INode): void {
      output.push(node)
    },
    end () {
      return
    }
  }
}

test('select everything on an empty list should just end', async t => {
  let ended = false
  const done = await selectNodes({}, [], {
    isClosed: () => false,
    addNode (node: INode): void {
      return
    },
    end (): void {
      ended = true
    }
  })
  t.equals(ended, true, 'successfully ended')
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
  await selectNodes(query,
    createTreeNodes(list),
    gatherNodes(output)
  )
  return output
}

test('select everything on a full list should return every entry, unsorted', async t => {
  const { a, b } = createABNodes()
  const output = await selectInABNodes([b, a, b], {})
  t.deepEquals(output, [b, a, b], 'Nodes returned like before')
})

test('selecting a point range should only return points within the range', async t => {
  const { a, b } = createABNodes()
  const output = await selectInABNodes([b, a, b], {
    pointRange: {
      max: 7
    }
  })
  t.deepEquals(output, [b, a], 'limited to the first two blocks')
})

test('the max range larger than the first node, should return empty set', async t => {
  const { a, b } = createABNodes()
  const output = await selectInABNodes([b, a, b], {
    pointRange: {
      max: 1
    }
  })
  t.deepEquals(output, [], 'empty set returned')
})

test('using minimum point range to limit the points', async t => {
  const { a, b } = createABNodes()
  const output = await selectInABNodes([b, a, b], {
    pointRange: {
      min: 1,
      max: 3
    }
  })
  t.deepEquals(output, [b])
})

test('the minimum point range is lower equal', async t => {
  const { a, b } = createABNodes()
  const output = await selectInABNodes([b, a, b], {
    pointRange: {
      min: 4,
      max: 9
    }
  })
  t.deepEquals(output, [a, b])
})

test('Only points in the cut should be returned', async t => {
  const { a, b, c, d, e } = createABNodes()
  const output = await selectInABNodes([e, d, c, b, a], {
    cut: [
      { min: { x: 0, y: 0, z: 0 }, max: { x: 1, y: 1, z: 1 } }
    ]
  })
  t.deepEquals(output, [b, a])
})

test('With multiple cuts, nodes that cut any of those should be returned', async t => {
  const { a, b, c, d, e } = createABNodes()
  const output = await selectInABNodes([e, d, c, b, a], {
    cut: [
      { min: { x:  .0, y:  .0, z:  .0 }, max: { x:  1.0, y:  1.0, z:  1.0 } },
      { min: { x: 9.0, y: 9.0, z: 9.0 }, max: { x: 10.0, y: 10.0, z: 10.0 } }
    ]
  })
  t.deepEquals(output, [e, d, b, a])
})

test('Only points in any of the multiple cut should be returned', async t => {
  const { a, b, c, d, e } = createABNodes()
  const output = await selectInABNodes([e, d, c, b, a], {
    display: [{ cam: new PerspectiveCamera() }]
  })
  t.deepEquals(output, [a, b])
})
