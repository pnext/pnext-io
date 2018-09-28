export enum LasVersion {
  V1_0 = '1.0',
  V1_1 = '1.1',
  V1_2 = '1.2',
  V1_3 = '1.3',
  V1_4 = '1.4'
}

export const LasVersions = Object.values(LasVersion)

export function gteVersion (smaller: LasVersion, bigger: LasVersion): boolean {
  if (smaller === bigger) {
    return true
  }
  for (const current of LasVersions) {
    if (current === bigger) {
      return true
    }
    if (current === smaller) {
      return false
    }
  }
  return false
}
