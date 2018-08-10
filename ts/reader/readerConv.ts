import TsStream from 'ts-stream'

function consume (from: ReadableStreamReader, to: TsStream<Uint8Array>): void {
  from
    .read()
    .then(({ done, value }) => {
      if (done) {
        to.end()
        return
      }
      to.write(value)
        .then(() => consume(from, to))
        .catch(() => {
          from.cancel()
          from.releaseLock()
        })
    })
    .catch(error => to.abort(error))
}

export default function readerConv (from: ReadableStreamReader): TsStream<Uint8Array> {
  const to = new TsStream<Uint8Array>()
  consume(from, to)
  return to
}
