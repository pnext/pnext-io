import { isPromiseLike } from './isPromiseLike'

type Ender<T> = (err?: Error, value?: T) => PromiseLike<T> | T

export interface LazyPromise<T> extends Promise<T> {
  reject (error: Error): void
  resolve (value?: T): void
  addEnder (ender: Ender<T>): LazyPromise<T>
  done: boolean
}

export function lazyInitLazyPromise<T> (init?: (p: LazyPromise<T>) => void): () => LazyPromise<T> {
  let p
  return function () {
    if (p === undefined) {
      p = createLazyPromise()
      if (init !== undefined) {
        init(p)
      }
    }
    return p
  }
}

export function createLazyPromise<T> (): LazyPromise<T> {
  let _resolve
  let _reject
  let _ender: Ender<T>
  let lazy: any = new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })
  let done
  lazy.addEnder = function (ender: Ender<T>) {
    if (_ender === undefined) {
      _ender = ender
      return
    }
    const formerEnder = _ender
    _ender = (error?: Error, result?: T) => {
      let enderResult: T
      try {
        const p = formerEnder(error, result)
        if (isPromiseLike(p)) {
          return p.then((value) => ender(null, value), ender)
        }
        enderResult = p
      } catch (enderError) {
        return ender(enderError)
      }
      return ender(null, enderResult)
    }
  }
  lazy.resolve = function (value) {
    if (done === true) {
      return
    }
    done = true
    if (_ender !== undefined) {
      return execEnder(null, value)
    }
    _resolve(value)
  }
  lazy.reject = function (error) {
    if (done === true) {
      return
    }
    done = true
    if (_ender !== undefined) {
      return execEnder(error)
    }
    _reject(error)
  }
  function execEnder (error?: Error, result?: T) {
    let r
    try {
      r = _ender(error, result)
    } catch (enderError) {
      return _reject(enderError)
    }
    if (isPromiseLike(r)) {
      r.then(_resolve, _reject)
      return
    }
    _resolve(r)
  }
  return lazy as LazyPromise<T>
}
