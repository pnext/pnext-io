import { IReadable } from '../api/IReadable'
import { createLazyPromise } from './createLazyPromise'

export function getAll <T> (stream: IReadable<T>): Promise<T[]> {
  const p = createLazyPromise<T[]>()
  const list = []
  let oneFound = false
  stream.forEach(
    item => { list.push(item) },
    (error?: Error) => {
      if (error) {
        return p.reject(error)
      }
      p.resolve(list)
    },
    (reason?: Error) => p.reject(reason)
  )
  return p
}
