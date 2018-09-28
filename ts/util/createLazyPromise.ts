interface LazyPromise<T> extends Promise<T> {
  reject (error: Error): void
  resolve (value?: T): void
}

export function createLazyPromise<T> (result?: (value) => PromiseLike<void> | void): LazyPromise<T> {
  let _resolve
  let _reject
  let done = false
  let p: any = new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })
  if (result) {
    p = p.then(result)
  }
  p.resolve = function (value) {
    if (done) {
      return
    }
    done = true
    if (_resolve) {
      _resolve(value)
    } else {
      setImmediate(() => {
        done = false
        p.resolve(value)
      })
    }
  }
  p.reject = function (error) {
    if (done) {
      return
    }
    done = true
    if (_reject) {
      _reject(error)
    } else {
      setImmediate(() => {
        done = false
        p.reject(error)
      })
    }
  }
  return p as LazyPromise<T>
}
