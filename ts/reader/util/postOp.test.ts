import { postOpSimple } from './postOp'
import FeatureType from '../../api/FeatureType'
import uint32 from '../type/uint32'
import fixedString from '../type/fixedString'
import { dArr } from './_test/dArr'
import { createWorkContext } from './createWorkContext'

const simple = postOpSimple(
  fixedString(4),
  FeatureType.string,
  input => input + 'xxx'
)

test('Statically reading from an array', () => {
  const data = dArr([65, 65, 65, 65])
  expect(simple.fixedSize).toBe(true)
  expect(simple.minSize).toBe(4)
  expect(simple.read(data, 0)).toBe('AAAAxxx')
  const ctx = createWorkContext()
  expect(simple.readDynamic(data, ctx)).toBe(true)
  expect(ctx.data).toBe('AAAAxxx')
})
