import decodeUtf8 from 'decode-utf8'

export default function decodeUtf8Context (context) {
  context.data = decodeUtf8(context.data)
  return true
}
