import { LasPointFormat } from '../LasPointFormat'
import PointClass from '../../../api/PointClass'

export const LidarPointClasses1 = {
  0: PointClass.NEVER_CLASSIFIED,
  /*
    We are using both 0 and 1 as Unclassified to maintain
    compatibility with current popular classification software
    such as TerraScan. We extend the idea of classification value
    1 to include cases in which data have been subjected to a
    classification algorithm but emerged in an undefined state.
    For example, data with class 0 is sent through an algorithm
    to detect man-made structures – points that emerge without
    having been assigned as belonging to structures could be
    remapped from class 0 to class 1.
  */
  1: PointClass.UNCLASSIFIED,
  2: PointClass.GROUND,
  3: PointClass.LOW_VEGETATION,
  4: PointClass.MEDIUM_VEGETATION,
  5: PointClass.HIGH_VEGETATION,
  6: PointClass.BUILDING,
  7: PointClass.LOW_POINT,
  8: PointClass.MODEL_KEY_POINT,
  9: PointClass.WATER,
  /*
    Overlap Points are those points that were immediately culled
    during the merging of overlapping flight lines. In general,
    the Withheld bit should be set since these points are not
    subsequently classified.
  */
  12: PointClass.OVERLAP_POINTS
}
for (let classification = 13; classification <= 31; classification++) {
  LidarPointClasses1[classification] = PointClass.USER_CLASS
}

export const LidarPointClasses2 = {
  0: PointClass.NEVER_CLASSIFIED,
  1: PointClass.UNCLASSIFIED,
  2: PointClass.GROUND,
  3: PointClass.LOW_VEGETATION,
  4: PointClass.MEDIUM_VEGETATION,
  5: PointClass.HIGH_VEGETATION,
  6: PointClass.BUILDING,
  7: PointClass.LOW_POINT,
  9: PointClass.WATER,
  10: PointClass.RAIL,
  11: PointClass.ROAD_SURFACE,
  13: PointClass.WIRE_GUARD,
  14: PointClass.WIRE_CONDUCTOR,
  15: PointClass.TRANSMISSION_TOWER,
  16: PointClass.WIRE_STRUCTURE_CONNECTOR,
  17: PointClass.BRIDGE_DECK,
  18: PointClass.HIGH_NOISE
}
for (let classification = 64; classification <= 255; classification++) {
  LidarPointClasses2[classification] = PointClass.USER_CLASS
}

export interface ILasClassificationConverter {
  isReserved: (classification: number) => boolean,
  toString (classification?: number): string,
  read (classification: number): ILasClassification,
  map: { [classification: number]: PointClass }
}

export enum ClassificationFlag {
  Synthetic = 1,
  'Key-Point' = 8,
  'Withheld' = 16,
  'Overlap' = 32
}

export interface ILasClassification {
  classification: number
  // Old classification flags are evaluable directly, new ones are stored in the separate 'Classification Flag' entry
  flag?: number,
}

const version2: ILasClassificationConverter = {
  isReserved (classification: number): boolean {
    if (classification === 8) return true
    if (classification === 12) return true
    if (classification >= 19 && classification <= 63) return true
    return false
  },
  map: LidarPointClasses2,
  read (classification: number): ILasClassification {
    return {
      classification
    }
  }
}

const version1: ILasClassificationConverter = {
  isReserved (classification: number): boolean {
    if (classification === 10) return true
    if (classification === 11) return true
    if (classification >= 13 && classification <= 31) return true
    return false
  },
  map: LidarPointClasses1,
  read (classification: number): ILasClassification {
    return {
      classification,
      flag: classification >>> 5
    }
  }
}

const formatMap: { [pdrfVersion: number]: ILasClassificationConverter } = {
  [ LasPointFormat.PDRF_0 ]: version1,
  [ LasPointFormat.PDRF_1 ]: version1,
  [ LasPointFormat.PDRF_2 ]: version1,
  [ LasPointFormat.PDRF_3 ]: version1,
  [ LasPointFormat.PDRF_4 ]: version1,
  [ LasPointFormat.PDRF_5 ]: version1,
  [ LasPointFormat.PDRF_6 ]: version2,
  [ LasPointFormat.PDRF_7 ]: version2,
  [ LasPointFormat.PDRF_8 ]: version2,
  [ LasPointFormat.PDRF_9 ]: version2,
  [ LasPointFormat.PDRF_10 ]: version2
}

export default formatMap
