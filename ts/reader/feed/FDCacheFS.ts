import { IFeedFS } from './IFeedFS'

export class FDCache implements IFeedFS {
  fs: IFeedFS

  constructor (fs: IFeedFS) {
    this.fs = fs
  }

  open (location: string, flags: number, cb: (err: Error, fd: number) => void): void {
    return
  }

  close (fd: number, cb: (err: Error) => void): void {
    return
  }

  read (fd: number, buffer: Uint8Array, bufferOffset: number, length: number, start: number, cb: (err: Error, bytesRead: number) => void): void {
    this.fs.read(fd, buffer, bufferOffset, length, start, cb)
  }
}
