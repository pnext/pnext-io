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
  done: boolean = false

  constructor (ender?: () => PromiseLike<void> | void) {
    this.aborted = lazyInitLazyPromise()
    this.result = lazyInitLazyPromise(p => {
      if (ender !== undefined) {
        p.addEnder(ender)
      }
    })
  }

  aborted: () => LazyPromise<never>
  result: () => LazyPromise<void>
  _current: PromiseLike<void>
  _next: (() => PromiseLike<void> | void)[]

  abort (reason: Error) {
    if (this.done === true) {
      // No need to abort after we are done
      return
    }
    this.done = true
    if (this._current !== undefined) {
      // It is aborted: we can drop all the other operations
      // in the queue.
      this._next = [() => this.abort(reason)]
      return
    }
    this.aborted().reject(reason)
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
      if (this._next !== undefined && this._next.length !== 0) {
        this.next(this._next.shift())
      }
    })
    return this.result()
  }

  next (fn: () => PromiseLike<void> | void) {
    if (this.done === true) {
      // If its aborted or finished: don't start another task
      return
    }
    if (this._current !== undefined || this.reader === undefined) {
      if (this._next === undefined) {
        this._next = [fn]
        return
      }
      this._next.push(fn)
      return
    }
    let current
    try {
      current = fn()
    } catch (err) {
      return this.result().reject(err)
    }
    if (!current) {
      return
    }
    current.then(() => {
      this._current = undefined
      if (this._next !== undefined && this._next.length > 0) {
        const nextFn = this._next.shift()
        this.next(nextFn)
      }
    }, err => this.result().reject(err))
    this._current = current
  }

  end (error?: Error) {
    if (this.done === true) {
      return
    }
    this.next(() => {
      if (error) {
        this.result().reject(error)
      } else {
        this.result().resolve()
      }
    })
    this.done = true
  }
}
