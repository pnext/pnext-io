import AbstractIO from '../util/AbstractIO'
import ITree from '../api/ITree'
import ITreeQuery from '../api/ITreeQuery'
import Stream from 'ts-stream'

function ignoreError () {
  return
}

export default abstract class AbstractSingleTreeIO extends AbstractIO {
  treeP: Promise<ITree>

  constructor (treeP: Promise<ITree>) {
    super()
    this.treeP = treeP
  }

  _getTrees (stream: Stream<ITree>, query?: ITreeQuery) {
    this.treeP.then(tree => {
      const ids = query && query.ids ? query.ids : [ null ]
      for (const id of ids) {
        if (id !== null && id !== tree.id) {
          stream.end(new Error(`Unknown tree ${id}`)).catch(ignoreError)
          return
        }
        stream.write(tree)
      }
      stream.end()
    })
  }
}
