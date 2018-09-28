import decodeUtf8 from 'decode-utf8'
import { IReadable } from '../../../ts/api/IReadable'
import { combine } from '../../../ts/reader/util/combine'
import { getAll } from '../../../ts/util/getAll'

export async function streamToString (stream: IReadable<Uint8Array>): Promise<string> {
  return decodeUtf8(combine(await getAll(stream)))
}
