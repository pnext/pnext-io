import decodeUtf8 from 'decode-utf8'
import { IReadable } from '../../api/IReadable'
import { getAll } from '../../util/getAll'
import { combine } from '../util/combine'

export async function streamToString (stream: IReadable<Uint8Array>): Promise<string> {
  return decodeUtf8(combine(await getAll(stream)))
}
