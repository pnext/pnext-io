export enum ScanDirection {
  POSITIVE = 1,
  NEGATIVE = 0
}

export default interface IPoint {
  x: number,
  y: number,
  z: number,
  classificiation?: number,
  synthetic?: boolean,
  keyPoint?: boolean,
  withheld?: boolean,
  overlap?: boolean,
  r?: number,
  g?: number,
  b?: number,
  a?: number,
  returnNumber?: number,
  numberOfReturns?: number,
  edge?: boolean,
  nir?: number,
  xt?: number,
  yt?: number,
  zt?: number,
  scanAngle?: number,
  scannerChannel?: number,
  direction?: ScanDirection,
  time?: number,
  returnPointLocation?: number,
}
