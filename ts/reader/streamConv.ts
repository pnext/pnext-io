import { Stream as TsStream } from 'ts-stream'
import { Readable, Writable, WritableOptions } from 'stream'
import { mapSeries } from 'bluebird'

export function streamConv<t> (from: Readable): TsStream<t> {
  const to = new TsStream<t>()
  from.pipe(new Writable({
    write: (chunk, encoding, callback: (error?: Error) => void) =>
      to
        .write(chunk)
        .then(() => callback())
        .catch(callback),

    writev: (chunks: any[], callback: (error?: Error) => void) =>
      mapSeries(chunks, chunk => to.write(chunk))
        .then(() => callback())
        .catch(callback),

    destroy: (error: Error) => to.abort(error),

    final: (callback: (error?: Error) => void) =>
      to
        .end()
        .then(() => callback())
        .catch(callback)
  }))
  to.aborted().then(_ => from.destroy())
  return to
}
