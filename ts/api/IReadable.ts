import { Readable, Common } from 'ts-stream'

export interface IReadable<T> extends Readable<T>, Common<T> {}
