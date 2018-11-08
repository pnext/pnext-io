import { LazyPromise, lazyInitLazyPromise } from '../../util/createLazyPromise'

export interface IStreamState {
  aborted (): PromiseLike<never>
  result (): PromiseLike<void>
  abort (reason: Error): void
}

export interface IStreamOptions<Output> {
  reader (item: Output): PromiseLike<void> | void
  ender?: (error?: Error) => void,
  aborter?: (error: Error) => void
}

function ignore () { /* ignore */ }

export class StreamState <Output> implements IStreamState {
  reader: (data: Output) => PromiseLike<void> | void
  aborted: () => LazyPromise<never>
  result: () => LazyPromise<void>
  done: boolean = false
  _current: PromiseLike<void>
  _next: (() => PromiseLike<void> | void)[]

  // If set to true, the processing of next is suspended,
  // new "next" requests are added to the next list.
  _nextLock: boolean = true

  constructor (ender?: () => PromiseLike<void> | void) {
    this.aborted = lazyInitLazyPromise()
    this.result = lazyInitLazyPromise(p => {
      if (ender !== undefined) {
        p.addEnder(ender)
      }
    })
  }

  abort (reason: Error) {
    if (this.done === true) {
      // No need to abort after we are done
      return
    }
    this.aborted().reject(reason)
    if (this._current !== undefined) {
      // It is aborted: we can drop all the other operations
      // in the queue.
      this._next = [() => this.abort(reason)]
      return
    }
    this.done = true
    this.aborted().catch(ignore)
    this.result().reject(reason)
  }

  push (data: Output) {
    this.next(() => this.reader(data))
  }

  forEach (
    reader: (item: Output) => PromiseLike<void> | void,
    ender?: (error?: Error) => void,
    aborter?: (error: Error) => void
  ): Promise<void> {
    if (this.reader !== undefined) {
      throw new Error('Stream can be opened only once!')
    }
    this.reader = reader
    if (ender) {
      this.result().addEnder(ender)
    }
    if (aborter) {
      this.aborted().catch(aborter)
    }
    setImmediate(() => {
      this.releaseNextLock()
    })
    return this.result()
  }

  releaseNextLock () {
    this._nextLock = false
    if (this._next !== undefined && this._next.length > 0) {
      const nextFn = this._next.shift()
      this.next(nextFn)
    }
  }

  next (fn: () => PromiseLike<void> | void) {
    if (this.done === true) {
      // If its aborted or finished: don't start another task
      return
    }
    if (this._current !== undefined || this._nextLock === true) {
      if (this._next === undefined) {
        this._next = [fn]
        return
      }
      this._next.push(fn)
      return
    }
    this._nextLock = true
    let current
    try {
      current = fn()
    } catch (err) {
      return this.result().reject(err)
    }
    if (!current) {
      this.releaseNextLock()
      return
    }
    current.then(() => {
      this._current = undefined
      this.releaseNextLock()
    }, err => this.result().reject(err))
    this._current = current
  }

  end (error?: Error) {
    this.next(() => {
      this.done = true
      if (error) {
        this.result().reject(error)
      } else {
        this.result().resolve()
      }
    })
  }
}
