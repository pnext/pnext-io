import Oct, { OctRegistry } from './Oct'

test('Oct Registry test', () => {
  const reg = new OctRegistry()
  const addr = [Oct.AX1, Oct.AX2]
  const addr2 = addr.concat()
  expect(addr).not.toBe(addr2) // Making sure that the two addresses are not the same
  expect(reg.hasAddress(addr)).toBe(false) // Before the registration hasAddress should return empty'
  expect(reg.registerAddress(addr)).toBe(addr) // Registration should work and return the initial address'
  expect(reg.hasAddress(addr)).toBe(true) // After registration hasAddress should work'
  expect(reg.hasAddress(addr.slice(0, 1))).toBe(true) // Upper level codes should be added too'
  expect(reg.registerAddress(addr)).toBe(addr) // Registrating "test" twice should still return addr'
  expect(reg.registerAddress(addr2)).toBe(addr) // Registrating a similar address should still return addr'
})
