import { execCallbacks } from './execCallbacks'

export abstract class IdleItem {

  idleCallbacks: (() => any)[] = []

  checkIdle () {
    if (this.isIdle()) {
      this.idleCallbacks = execCallbacks(this.idleCallbacks)
    }
  }

  onIdle (): Promise<void> {
    return new Promise(resolve => {
      if (this.isIdle()) {
        return resolve()
      }
      this.idleCallbacks.push(resolve)
    })
  }

  abstract isIdle (): boolean
}
