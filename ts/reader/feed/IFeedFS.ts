export interface IFeedFS {
  open (location: string, flags: number, cb: (err: Error, fd?: number) => void): void
  close (fd: number, cb: (err: Error) => void): void
  read (fd: number, buffer: Uint8Array, bufferOffset: number, length: number, start: number, cb: (err: Error, bytesRead?: number) => void): void
}
