import { LasPointFormat } from '../LasPointFormat'
import IReader from '../../../reader/IReader'
import pdrf_0 from './pdrf_0'
import pdrf_1 from './pdrf_1'
import pdrf_2 from './pdrf_2'
import pdrf_3 from './pdrf_3'
import pdrf_4 from './pdrf_4'
import pdrf_5 from './pdrf_5'
import pdrf_6 from './pdrf_6'
import pdrf_7 from './pdrf_7'
import pdrf_8 from './pdrf_8'
import pdrf_9 from './pdrf_9'
import pdrf_10 from './pdrf_10'
import IPoint from '../../../api/IPoint'
import { FeatureObject } from '../../../api/FeatureType'

const readerByFormat: { [ format: number ]: IReader<IPoint, FeatureObject> } = {
  [ LasPointFormat.PDRF_0 ]: pdrf_0,
  [ LasPointFormat.PDRF_1 ]: pdrf_1,
  [ LasPointFormat.PDRF_2 ]: pdrf_2,
  [ LasPointFormat.PDRF_3 ]: pdrf_3,
  [ LasPointFormat.PDRF_4 ]: pdrf_4,
  [ LasPointFormat.PDRF_5 ]: pdrf_5,
  [ LasPointFormat.PDRF_6 ]: pdrf_6,
  [ LasPointFormat.PDRF_7 ]: pdrf_7,
  [ LasPointFormat.PDRF_8 ]: pdrf_8,
  [ LasPointFormat.PDRF_9 ]: pdrf_9,
  [ LasPointFormat.PDRF_10 ]: pdrf_10
}

export default readerByFormat
