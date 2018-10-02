import { LasVersion } from './LasVersion'

export enum LasPointFormat {
  PDRF_0 = 0,
  PDRF_1 = 1,
  PDRF_2 = 2,
  PDRF_3 = 3,
  PDRF_4 = 4,
  PDRF_5 = 5,
  PDRF_6 = 6,
  PDRF_7 = 7,
  PDRF_8 = 8,
  PDRF_9 = 9,
  PDRF_10 = 10
}

export const ALL_FORMATS = [
  LasPointFormat.PDRF_0,
  LasPointFormat.PDRF_1,
  LasPointFormat.PDRF_2,
  LasPointFormat.PDRF_3,
  LasPointFormat.PDRF_4,
  LasPointFormat.PDRF_5,
  LasPointFormat.PDRF_6,
  LasPointFormat.PDRF_7,
  LasPointFormat.PDRF_8,
  LasPointFormat.PDRF_9,
  LasPointFormat.PDRF_10
]

export const formatByVersion: { [version: string]: number[] } = {
  [ LasVersion.V1_0 ]: ALL_FORMATS,
  [ LasVersion.V1_1 ]: ALL_FORMATS,
  [ LasVersion.V1_2 ]: ALL_FORMATS,
  [ LasVersion.V1_3 ]: ALL_FORMATS,
  [ LasVersion.V1_4 ]: ALL_FORMATS
}
