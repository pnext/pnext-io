import { getAll } from './getAll'
import Stream from 'ts-stream'

test('Getting all data from a stream', async () => {
  expect(await getAll(Stream.from([1, 2, 3])))
    .toMatchObject([1, 2, 3])
})

test('ending with error, ends the stream', async () => {
  const stream = new Stream<number>()
  const err = new Error('hey!')
  stream.end(err)
  await expect(getAll(stream)).rejects.toBe(err)
  await expect(stream.result()).rejects.toBe(err)
})

test('abort with error, ends the stream', async () => {
  const stream = new Stream<number>()
  const err = new Error('hey!')
  stream.abort(err)
  await expect(getAll(stream)).rejects.toBe(err)
})
