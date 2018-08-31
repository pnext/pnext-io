import LasPointFormat from '../LasPointFormat'

export enum LidarPointClasses1 {
  'Created, never classified' = 0,
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
  'Unclassified' = 1,
  'Ground' = 2,
  'Low Vegetation' = 3,
  'Medium Vegetation' = 4,
  'High Vegetation' = 5,
  'Building' = 6,
  'Low Point (noise)' = 7,
  'Model Key-point (mass point)' = 8,
  'Water' = 9,
  /*
    Overlap Points are those points that were immediately culled
    during the merging of overlapping flight lines. In general,
    the Withheld bit should be set since these points are not
    subsequently classified.
  */
  'Overlap Points' = 12
}

export enum LidarPointClasses2 {
  'Created, never classified' = 0,
  'Unclassified' = 1,
  'Ground' = 2,
  'Low Vegetation' = 3,
  'Medium Vegetation' = 4,
  'High Vegetation' = 5,
  'Building' = 6,
  'Low Point (noise)' = 7,
  'Water' = 9,
  'Rail' = 10,
  'Road Surface' = 11,
  'Wire – Guard (Shield)' = 13,
  'Wire – Conductor (Phase)' = 14,
  'Transmission Tower' = 15,
  'Wire-structure Connector (e.g. Insulator)' = 16,
  'Bridge Deck' = 17,
  'High Noise' = 18
}

export interface ILasClassificationConverter {
  isReserved: (classification: number) => boolean,
  toString (classification?: number): string,
  read (classification: number): ILasClassification,
  map: { [classification: number]: string }
}

export enum ClassificationFlag {
  Synthetic = 1,
  'Key-Point' = 8,
  'Withheld' = 16,
  'Overlap' = 32
}

export interface ILasClassification {
  name: string,
  classification: number,
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
  map: Object.keys(LidarPointClasses2).reduce((map: { [value: number]: string }, name) => {
    map[LidarPointClasses2[name]] = name
    return map
  }, {}),
  toString (classification?: number): string {
    if (classification === undefined) return super.toString()
    if (this.isReserved(classification)) return 'Reserved'
    return this.map[classification] || `User definable [${classification}]`
  },
  read (classification: number): ILasClassification {
    return {
      name: this.toString(classification),
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
  map: Object.keys(LidarPointClasses1).reduce((map: { [value: number]: string }, name) => {
    map[LidarPointClasses1[name]] = name
    return map
  }, {}),
  toString (classification?: number): string {
    if (classification === undefined) return super.toString()
    if (this.isReserved(classification)) return 'Reserved'
    return this.map[classification] || `User definable [${classification}]`
  },
  read (classification: number): ILasClassification {
    return {
      name: this.toString(classification),
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
