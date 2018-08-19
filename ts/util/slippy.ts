import IBox3 from '../api/IBox3'
import IVector3 from '../api/IVector3'
import ISphere from './ISphere'
import { ZERO } from 'long'
import distancePointPoint from './distancePointPoint'

export interface SlippyMap {
  d: number,
  x: number,
  y: number,
  z: number
}

export function slippyToString (loc: SlippyMap): string {
  return `${loc.d}-${loc.x}-${loc.y}-${loc.z}`
}

const ZERO_BOUNDS: IBox3 = {
  min: { x: 0, y: 0, z: 0 },
  max: { x: 1, y: 1, z: 1 }
}

const D_BASE: { [ k: number ]: number | undefined } = {}
function getBase (d: number): number {
  let base = D_BASE[d]
  if (base === undefined) {
    base = 1 / Math.pow(2, d)
    D_BASE[d] = base
  }
  return base
}
const D_RADIUS: { [ k: number ]: number | undefined } = {}
function getRadius (base: number): number {
  let radius = D_RADIUS[base]
  if (radius === undefined) {
    radius = distancePointPoint(
      { x: 0, y: 0, z: 0 },
      { x: base, y: base, z: base }
    ) * 0.5
    D_RADIUS[base] = radius
  }
  return radius
}

export function slippyBounds (loc: SlippyMap): IBox3 {
  if (loc.d <= 0) {
    return ZERO_BOUNDS
  }
  const base = getBase(loc.d)
  const min = {
    x: loc.x * base,
    y: loc.y * base,
    z: loc.z * base
  }
  return {
    min,
    max: {
      x: min.x + base,
      y: min.y + base,
      z: min.z + base
    }
  }
}

export function slippySphere (loc: SlippyMap): ISphere {
  const base = getBase(loc.d)
  return {
    radius: getRadius(base),
    center: {
      x: (loc.x + 0.5) * base,
      y: (loc.y + 0.5) * base,
      z: (loc.z + 0.5) * base
    }
  }
}

export const SLIPPY_ZERO: SlippyMap = { d: 0, x: 0, y: 0, z: 0 }

const PARSER = /^(\d+)-(\d+)-(\d+)-(\d+)$/i

export function parseSlippy (from: string): SlippyMap {
  const parts = PARSER.exec(from)
  if (parts === null) {
    throw new Error(`Invalid slippMap ID: ${from}`)
  }
  return {
    d: parseInt(parts[1], 10),
    x: parseInt(parts[2], 10),
    y: parseInt(parts[3], 10),
    z: parseInt(parts[4], 10)
  }
}

export function slippyParent (map: SlippyMap): SlippyMap {
  return {
    d: map.d - 1,
    x: map.x / 2 | 0,
    y: map.y / 2 | 0,
    z: map.z / 2 | 0
  }
}

export function slippyParentString (map: SlippyMap): string {
  return slippyToString(slippyParent(map))
}
