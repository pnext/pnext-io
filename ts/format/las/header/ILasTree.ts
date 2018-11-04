import { LasVersion } from '../LasVersion'
import IReader from '../../../reader/IReader'
import { PointsByReturn } from './fromHeader'
import ITree from '../../../api/ITree'
import { INodeLimit } from '../../../util/AbstractVirtualNodesIO'
import IPoint from '../../../api/IPoint'
import { FeatureObject } from '../../../api/FeatureType'
import { IVarLengthRecord } from './IVarLengthRecord'

export interface ILasTree extends ITree, INodeLimit {
  version: LasVersion
  pointReader: IReader<IPoint, FeatureObject>
  pointsByReturn: PointsByReturn
  pointOffset: number | Long
  varLenRecords: IVarLengthRecord[]
}
