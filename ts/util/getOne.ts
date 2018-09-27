import { IReadable } from '../api/IReadable'

export const ONLY_ONE_NEEDED = new Error('From this stream only the first entry is needed.')

export function getOne<T> (stream: IReadable<T>, abortAfterFound: boolean = true): Promise<T> {
  let resolve
  let reject
  const p = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  let oneFound = false
  stream.forEach(
    item => {
      if (oneFound) {
        return
      }
      oneFound = true
      resolve(item)
      if (abortAfterFound) {
        stream.abort(ONLY_ONE_NEEDED)
      }
    },
    (error?: Error) => {
      if (oneFound) {
        return
      }
      if (error) {
        return reject(error)
      }
      resolve(null)
    },
    (reason?: Error) => {
      if (oneFound) {
        return
      }
      reject(reason)
    }
  )
  return p
}
