export function execCallbacks (callbacks: (() => any)[]) {
  if (callbacks.length === 0) {
    return callbacks
  }
  setImmediate(() => {
    for (const callback of callbacks) {
      callback()
    }
  })
  return []
}
