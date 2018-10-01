// Following same logic as isPromiseLike
export function isIterable <T> (arg: T | Iterable<T> | undefined | null): arg is Iterable<T> {
  return typeof arg === 'object' && typeof arg[Symbol.iterator] === 'function'
}
