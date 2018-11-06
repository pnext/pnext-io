import { createLazyPromise } from './createLazyPromise'

test('Simply calling a lazy promise', async () => {
  const p = createLazyPromise()
  setImmediate(() => p.resolve('hello'))
  await expect(p).resolves.toBe('hello')
})

test('immediately calling a lazy promise', async () => {
  const p = createLazyPromise()
  p.resolve('hello')
  await expect(p).resolves.toBe('hello')
})

test('Simply rejecting a lazy promise', async () => {
  const p = createLazyPromise()
  setImmediate(() => p.reject(new Error('hello')))
  await expect(p).rejects.toMatchObject(new Error('hello'))
})

test('immediately rejecting a lazy promise', async () => {
  const p = createLazyPromise()
  p.reject(new Error('hello'))
  await expect(p).rejects.toMatchObject(new Error('hello'))
})

test('Expect resolve/reject to be ignored after first resolve!', async () => {
  const p = createLazyPromise()
  setImmediate(() => {
    p.resolve('first')
    p.resolve('second')
    p.reject(new Error('third'))
  })
  await expect(p).resolves.toBe('first')
})

test('Expect resolve/reject to be ignored after first reject!', async () => {
  const p = createLazyPromise()
  setImmediate(() => {
    p.reject(new Error('first'))
    p.resolve('second')
    p.reject(new Error('third'))
  })
  await expect(p).rejects.toMatchObject(new Error('first'))
})

test('Expect simple ender to receive a null/value pair', async () => {
  const p = createLazyPromise<string>()
  p.addEnder((err?: Error, value?: string) => {
    expect(err).toBe(null)
    expect(value).toBe('promise result')
    return 'ender result'
  })
  setImmediate(() => p.resolve('promise result'))
  await expect(p).resolves.toBe('ender result')
})

test('Expect promise ender to override parent', async () => {
  const p = createLazyPromise<string>()
  p.addEnder(() => Promise.resolve('ender result'))
  setImmediate(() => p.resolve('promise result'))
  await expect(p).resolves.toBe('ender result')
})

test('Expect error in ender to reject parent', async () => {
  const p = createLazyPromise<string>()
  p.addEnder(() => {
    throw new Error('ender rejection')
  })
  setImmediate(() => p.resolve('promise value'))
  await expect(p).rejects.toMatchObject(new Error('ender rejection'))
})

test('Expect rejection in ender to reject parent', async () => {
  const p = createLazyPromise<string>()
  p.addEnder(() => Promise.reject(new Error('ender rejection')))
  setImmediate(() => p.resolve('promise value'))
  await expect(p).rejects.toMatchObject(new Error('ender rejection'))
})

test('Expect resolve in ender to override rejection', async () => {
  const p = createLazyPromise<string>()
  p.addEnder(() => 'ender result')
  setImmediate(() => p.resolve('promise result'))
  await expect(p).resolves.toBe('ender result')
})

test('Expect ender rejection to override promise rejection', async () => {
  const p = createLazyPromise<string>()
  p.addEnder(() => {
    throw new Error('ender rejection')
  })
  setImmediate(() => p.reject(new Error('promise rejection')))
  await expect(p).rejects.toMatchObject(new Error('ender rejection'))
})

test('Expect multiple enders to chain', async () => {
  const p = createLazyPromise<string>()
  p.addEnder(() => 'first ender')
  p.addEnder((err?: Error, value?) => {
    expect(err).toBe(null)
    expect(value).toBe('first ender')
    return 'second ender'
  })
  setImmediate(() => p.resolve(null))
  await expect(p).resolves.toBe('second ender')
})

test('Expect multiple enders to chain with promises', async () => {
  const p = createLazyPromise<string>()
  p.addEnder(() => Promise.resolve('first ender'))
  p.addEnder((err?: Error, value?) => {
    expect(err).toBe(null)
    expect(value).toBe('first ender')
    return 'second ender'
  })
  setImmediate(() => p.resolve(null))
  await p
})

test('Expect multiple enders to chain with exceptions', async () => {
  const p = createLazyPromise<string>()
  p.addEnder(() => {
    throw new Error('first ender error')
  })
  p.addEnder((err?: Error, value?) => {
    expect(err).toMatchObject(new Error('first ender error'))
    expect(value).toBe(undefined)
    return null
  })
  setImmediate(() => p.resolve(null))
  await p
})

test('Expect multiple enders to chain with rejected promises', async () => {
  const p = createLazyPromise<string>()
  p.addEnder(() => Promise.reject(new Error('first ender error')))
  p.addEnder((err?: Error, value?) => {
    expect(err).toMatchObject(new Error('first ender error'))
    expect(value).toBe(undefined)
    return null
  })
  setImmediate(() => p.resolve(null))
  await p
})
