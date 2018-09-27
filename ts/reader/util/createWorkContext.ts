import IDynamicContext from './IDynamicContext'

export class WorkContext implements IDynamicContext {
  byteOffset: number = 0
  size: number = 0
  data: any = null

  from (context: IDynamicContext) {
    this.byteOffset = context.byteOffset
  }

  to (context: IDynamicContext) {
    context.byteOffset = this.byteOffset
    context.size = this.size
    context.data = this.data
  }
}

export function createWorkContext () {
  return new WorkContext()
}
