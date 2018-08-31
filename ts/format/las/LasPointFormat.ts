import LasVersion from './LasVersion'

enum LasPointFormat {
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

export const V1_0_FORMATS = [
  LasPointFormat.PDRF_0,
  LasPointFormat.PDRF_1
]
export const V1_1_FORMATS = V1_0_FORMATS
export const V1_2_FORMATS = V1_1_FORMATS.concat([
  LasPointFormat.PDRF_2,
  LasPointFormat.PDRF_3
])
export const V1_3_FORMATS = V1_2_FORMATS.concat([
  LasPointFormat.PDRF_4,
  LasPointFormat.PDRF_5
])
export const V1_4_FORMATS = V1_3_FORMATS.concat([
  LasPointFormat.PDRF_6,
  LasPointFormat.PDRF_7,
  LasPointFormat.PDRF_8,
  LasPointFormat.PDRF_9,
  LasPointFormat.PDRF_10
])

export const formatByVersion: { [version: string]: number[] } = {
  [ LasVersion.V1_0 ]: V1_0_FORMATS,
  [ LasVersion.V1_1 ]: V1_1_FORMATS,
  [ LasVersion.V1_2 ]: V1_2_FORMATS,
  [ LasVersion.V1_3 ]: V1_3_FORMATS,
  [ LasVersion.V1_4 ]: V1_4_FORMATS
}

export default LasPointFormat
