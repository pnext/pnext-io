import { combine } from '../../../ts/reader/util/combine'
import decodeUtf8 from 'decode-utf8'
import { ReadableStream } from 'ts-stream'

export async function streamToString (stream: ReadableStream<Uint8Array>): Promise<string> {
  return decodeUtf8(combine(await stream.toArray()))
}
