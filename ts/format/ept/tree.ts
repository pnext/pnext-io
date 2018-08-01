import IBox3 from '../../api/IBox3'
import IVector3 from '../../api/IVector3'
import { parseFeatureString } from '../../api/FeatureType'
import IFeature from '../../api/IFeature'
import Feature from '../../api/Feature'
import ITree from '../../api/ITree'
import IInput from '../IInput'

function parseFeature (raw: {name: string, type: string }): IFeature {
  const type = parseFeatureString(raw.type)
  for (const featName in Feature) {
    const feat = Feature[featName]
    if (feat.name === raw.name && feat.type === type) {
      return feat
    }
  }
  return {
    name: raw.name,
    type
  }
}

function parseBounds (raw: number[]): IBox3 {
  return {
    min: parseVector(raw, 0),
    max: parseVector(raw, 3)
  }
}

function parseVector (raw: number[], offset: number): IVector3 {
  return { x: raw[offset], y: raw[offset + 1], z: raw[offset + 2] }
}

export default async function loadTree (input: IInput): Promise<ITree> {
  const json = await input.loadJson('entwine.json')
  return {
    id: input.id(),
    bounds: parseBounds(json.bounds),
    boundsConforming: parseBounds(json.boundsConforming),
    scale: json.scale,
    offset: parseVector(json.offset, 0),
    numPoints: json.numPoints,
    schema: json.schema.map(parseFeature),
    metadata: {
      ...json.metadata,
      dataType: json.dataType,
      hierarchyStep: json.hierarchyStep,
      hierarchyType: json.hierarchyType,
      reprojection: json.reprojection,
      srs: json.srs,
      ticks: json.ticks
    }
  }
}
