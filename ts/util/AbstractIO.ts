import ITree from '../api/ITree'
import ITreeQuery from '../api/ITreeQuery'
import { ReadableStream } from 'ts-stream'

export default class AbstractIO {
  getTrees (query: ITreeQuery): ReadableStream<ITree> {
    throw new Error('not implemented!')
  }

  async getTree (id: string, metadataProperties?: string[]): Promise<ITree> {
    const trees = await this.getTrees({
      ids: [id],
      metadataProperties
    }).toArray()
    return trees[0]
  }
}
