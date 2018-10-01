import { signature } from './signature'

test('abcd', () => {
  const sign = signature('ABCD')
  expect(sign.fixedSize).toBe(true)
  expect(sign.minSize).toBe(4)
})
