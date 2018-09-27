import { Writable } from 'ts-stream'
import { IReadable } from './IReadable'

export interface IDuplex<T> extends IReadable<T>, Writable<T> {}
