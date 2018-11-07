import fetch from 'cross-fetch'
import { IReadable } from '../../api/IReadable'
import { IFeed } from './IFeed'
import { IFeedRange } from './IFeedRange'
import { StreamState } from './StreamState'
import { ILocationFeed } from './ILocationFeed'

function applyHttpDefaults (lessImportant: RequestInit, moreImportant: RequestInit = {}): RequestInit {
  const result: RequestInit = {}
  Object.assign(result, lessImportant, moreImportant)
  result.headers = Object.assign({}, lessImportant.headers, moreImportant.headers)
  return result
}

function xfetch (location, options, range?: IFeedRange) {
  if (range) {
    options = Object.assign({}, options)
    options.headers = Object.assign(
      Object.assign({}, options.headers),
      {
        Range: `${range.start}-${range.end || ''}`
      }
    )
  }
  return fetch(location, options)
}

function httpRange (range: IFeedRange) {
  // if range.start === range.end and range.start === 0
  // should be handled before this!
  return `${range.start}-${range.end || ''}`
}

async function requestRange (location: string, options: RequestInit, range: IFeedRange): Promise<Response> {
  let res = await fetch(location, applyHttpDefaults(options, {
    headers: {
      Range: httpRange(range)
    }
  }))
  if (res.status === 200) {
    console.warn(`${location} doesn't support partial reading, loading whole data and cutting the parts`)
    res = await fetch(location, options)
  } else if (res.status !== 206) {
    throw new Error(`Unexpected http status code: ${res.status}`)
  }
  return res
}

async function requestNormal (location: string, options: RequestInit): Promise<Response> {
  const res = await fetch(location, options)
  if (res.status !== 200) {
    throw new Error(`Unexpected http status code: ${res.status}`)
  }
  return res
}

export function createHttpStream (location: string, range?: IFeedRange, options: RequestInit = {}): IReadable<Uint8Array> {
  const controller = new AbortController()
  const state = new StreamState<Uint8Array>()
  if (range && range.start === 0 && !range.end) {
    range = null
  }
  state.aborted().catch(() => controller.abort())
  options = applyHttpDefaults({
    keepalive: false,
    method: 'GET',
    redirect: 'follow'
  }, options)
  options.signal = controller.signal
  state.next(async () => {
    let res: Response
    let expectedStatus = 200
    if (range) {
      if (range.start === range.end) {
        state.push(new Uint8Array())
        state.end()
        return
      }
      res = await requestRange(location, options, range)
    } else {
      res = await requestNormal(location, options)
    }
    let arrayBuffer = await res.arrayBuffer()
    if (expectedStatus === 200 && range) {
      arrayBuffer = arrayBuffer.slice(range.start, range.end)
    }
    state.push(new Uint8Array(arrayBuffer))
    state.end()
  })
  return state
}

export class HttpFeed implements IFeed {

  defaultHeaders: RequestInit
  prefix: string

  constructor (defaultHeaders: RequestInit = {}, prefix: string = '') {
    this.prefix = prefix
    this.defaultHeaders = defaultHeaders
  }

  createLocationFeed (location: string, httpHeaders?: RequestInit): ILocationFeed {
    return {
      feed: this,
      location,
      createReadStream: (range?: IFeedRange) => this.createReadStream(location, range, httpHeaders)
    }
  }

  createReadStream (location: string, range?: IFeedRange, httpHeaders?: RequestInit): IReadable<Uint8Array> {
    if (httpHeaders) {
      httpHeaders = applyHttpDefaults(this.defaultHeaders, httpHeaders)
    } else {
      httpHeaders = this.defaultHeaders
    }
    return createHttpStream(`${this.prefix}${location}`, range, httpHeaders)
  }
}
