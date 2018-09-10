#!/usr/bin/env node --require ts-node/register
import { test } from 'tap'
import Oct, { OctRegistry } from '../../ts/api/Oct'

test('Oct Registry test', async t => {
  const reg = new OctRegistry()
  const addr = [Oct.AX1, Oct.AX2]
  const addr2 = addr.concat()
  t.notEquals(addr, addr2, 'Making sure that the two addresses are not the same')
  t.equals(reg.hasAddress(addr), false, 'Before the registration hasAddress should return empty')
  t.equals(reg.registerAddress(addr), addr, 'Registration should work and return the initial address')
  t.equals(reg.hasAddress(addr), true, 'After registration hasAddress should work')
  t.equals(reg.hasAddress(addr.slice(0, 1)), true, 'Upper level codes should be added too')
  t.equals(reg.registerAddress(addr), addr, 'Registrating "test" twice should still return addr')
  t.equals(reg.registerAddress(addr2), addr, 'Registrating a similar address should still return addr')
})
