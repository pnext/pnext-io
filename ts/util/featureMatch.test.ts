import FeatureType from '../../ts/api/FeatureType'
import featureMatch from '../../ts/util/featureMatch'

const x = { type: FeatureType.uint16, name: 'x' }
const y = { type: FeatureType.uint16, name: 'y' }

test('comparing two empty schema', async () => {
  expect(featureMatch([], [])).toBeNull()
})

test('comparing two equal schema', async () => {
  expect(featureMatch([x], [x])).toBeNull()
})

test('comparing two different schema should result in an error', async () => {
  const error = featureMatch([x], [y])
  expect(error).not.toBeNull()
})

test('comparing two different schema should result in an error', async () => {
  const error = featureMatch([x], [y])
  expect(error).not.toBeNull()
})

test('comparing two different schema with two different orders should work', async () => {
  const error = featureMatch([y, x], [x, y])
  expect(error).toBeNull()
})

test('comparing two similar schema', async () => {
  const error = featureMatch([x], [{ name: 'x', type: FeatureType.uint16 }])
  expect(error).toBeNull()
})

test('comparing two similar but not-matching type schema', async () => {
  const error = featureMatch([x], [{ name: 'x', type: FeatureType.uint32 }])
  expect(error).not.toBeNull()
})
