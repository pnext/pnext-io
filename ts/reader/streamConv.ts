import { Stream as TsStream } from 'ts-stream'
import { Readable, Writable, WritableOptions } from 'stream'
import { mapSeries } from 'bluebird'

export function streamConv<t> (from: Readable, byos: TsStream<t> = new TsStream<t>()): TsStream<t> {
  from.pipe(new Writable({
    write: (chunk, encoding, callback: (error?: Error) => void) =>
      byos
        .write(chunk)
        .then(() => callback())
        .catch(callback),

    writev: (chunks: any[], callback: (error?: Error) => void) =>
      mapSeries(chunks, chunk => byos.write(chunk))
        .then(() => callback())
        .catch(callback),

    destroy: (error: Error) => byos.abort(error),

    final: (callback: (error?: Error) => void) =>
      byos
        .end()
        .then(() => callback())
        .catch(callback)
  }))
  byos.aborted().then(_ => from.destroy())
  return byos
}
