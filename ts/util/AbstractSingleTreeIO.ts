import AbstractIO from '../util/AbstractIO'
import ITree from '../api/ITree'
import ITreeQuery from '../api/ITreeQuery'
import Stream from 'ts-stream'

function ignoreError () {
  return
}

export default class AbstractSingleTreeIO extends AbstractIO {
  treeP: Promise<ITree>

  constructor (treeP: Promise<ITree>) {
    super()
    this.treeP = treeP
  }

  getTrees (query?: ITreeQuery): Stream<ITree> {
    const stream = new Stream<ITree>()
    this.treeP.then(tree => {
      if (query && query.ids) {
        for (const id of query.ids) {
          if (id !== tree.id) {
            stream.end(new Error(`Unknown tree ${id}`)).catch(ignoreError)
            return
          }
        }
      }
      stream.write(tree)
      stream.end()
    })
    return stream
  }
}
