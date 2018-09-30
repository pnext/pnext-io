import { LasVersion, LasVersions, gteVersion } from './LasVersion'

test('Version double check', () => {
  expect(Object.keys(LasVersion)).toMatchObject([
    'V1_0', 'V1_1', 'V1_2', 'V1_3', 'V1_4'
  ]) // All Keys correct

  expect((Object as any).values(LasVersion)).toMatchObject([
    '1.0', '1.1', '1.2', '1.3', '1.4'
  ]) // All Values correct
})

test('Order of versions, double check', () => {
  expect(LasVersions).toMatchObject([
    LasVersion.V1_0,
    LasVersion.V1_1,
    LasVersion.V1_2,
    LasVersion.V1_3,
    LasVersion.V1_4
  ]) // Versionlist is of correct order
})

test('gte', () => {
  function ok (a: LasVersion, b: LasVersion) {
    expect(gteVersion(a, b)).toBe(true) // ${a} is >= than ${b}
  }
  function not (a: LasVersion, b: LasVersion) {
    expect(gteVersion(a, b)).toBe(false) // `${a} is < ${b}`
  }
  ok(LasVersion.V1_1, LasVersion.V1_0)
  not(LasVersion.V1_0, LasVersion.V1_1)
  ok(LasVersion.V1_0, LasVersion.V1_0)
})
