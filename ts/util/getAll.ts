import { IReadable } from '../api/IReadable'

export function getAll <T> (stream: IReadable<T>): Promise<T[]> {
  let resolve
  let reject
  const p = new Promise<T[]>((res, rej) => {
    resolve = res
    reject = rej
  })
  const list = []
  let oneFound = false
  stream.forEach(
    item => { list.push(item) },
    (error?: Error) => {
      if (error) {
        return reject(error)
      }
      resolve(list)
    },
    (reason?: Error) => { reject(reason) }
  )
  return p
}
