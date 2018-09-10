enum Oct {
  AX1 = 1,
  AX2 = 2,
  AY1 = 3,
  AY2 = 4,
  BX1 = 5,
  BX2 = 6,
  BY1 = 7,
  BY2 = 8
}

export interface OctNode {
  address: Oct[],
  children: {
    [ Oct.AX1 ]?: OctNode,
    [ Oct.AX2 ]?: OctNode,
    [ Oct.AY1 ]?: OctNode,
    [ Oct.AY2 ]?: OctNode,
    [ Oct.BX1 ]?: OctNode,
    [ Oct.BX2 ]?: OctNode,
    [ Oct.BY1 ]?: OctNode,
    [ Oct.BY2 ]?: OctNode
  }
}

export class OctRegistry {
  private root: OctNode
  private map: Map<Oct[], boolean>

  constructor () {
    this.root = {
      address: [],
      children: {}
    }
    this.map = new Map<Oct[], boolean>()
  }

  hasAddress (address: Oct[]): boolean {
    if (this.map.get(address)) {
      return true
    }
    let level = this.root
    for (const part of address) {
      level = level[part]
      if (!level) {
        return false
      }
    }
    return true
  }

  registerAddress (address: Oct[]): Oct[] {
    if (this.map.get(address)) {
      return address
    }
    let level = this.root
    let created = false
    for (let i = 0; i < address.length; i++) {
      const part = address[i]
      let nextLevel = level[part]
      if (!nextLevel) {
        created = true
        if (i === address.length - 1) {
          nextLevel = {
            address,
            children: {}
          }
        } else {
          const subAddress = address.slice(0, part)
          this.map.set(subAddress, true)
          nextLevel = {
            address: subAddress,
            children: {}
          }
        }
        level[part] = nextLevel
      }
      level = nextLevel
    }
    if (created) {
      this.map.set(address, true)
    }
    return level.address
  }
}

const REGISTRY = new OctRegistry()

export function registered (address: Oct[]): Oct[] {
  return REGISTRY.registerAddress(address)
}

export default Oct
