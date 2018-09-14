import { base, bottom } from './pdrf_0'
import { gpsTime } from './pdrf_1'
import long from '../../../reader/type/int32LE'
import unsignedShort from '../../../reader/type/uint16LE'
import char from '../../../reader/type/int8'
import bits from '../../../reader/util/bits'
import unsignedChar from '../../../reader/type/uint8'
import readerForReaders, { INamedReader } from '../../../reader/readerForReaders'
import IPoint from '../../../api/IPoint'

export const pdrf6Parts: INamedReader[] =
  base
  .concat([
    {
      reader: bits({
        /*
          The Return Number is the pulse return number for a given output pulse.
          A given output laser pulse can have many returns, and they must be marked
          in sequence of return. The first return will have a Return Number of one,
          the second a Return Number of two, and so on up to fifteen returns. The
          Return Number must be between 1 and the Number of Returns, inclusive.
        */
        0: 'returnNumber',
        1: 'returnNumber',
        2: 'returnNumber',
        3: 'returnNumber',
        /*
          The Number of Returns is the total number of returns for a given pulse.
          For example, a laser data point may be return two (Return Number) within
          a total number of up to fifteen returns.
        */
        4: 'numberOfReturns',
        5: 'numberOfReturns',
        6: 'numberOfReturns',
        7: 'numberOfReturns'
      }),
      name: 'mixedA'
    },
    {
      reader: bits({
        /*
          Classification flags are used to indicate special characteristics
          associated with the point. The bit definitions are:

          |-----|------------|-------------------------------------------------|
          | Bit | Field Name | Description                                     |
          |-----|------------|-------------------------------------------------|
          |  0  | Synthetic  | If set then this point was created by a         |
          |     |            | technique other than LIDAR collection such as   |
          |     |            | digitized from a photogrammetric stereo model   |
          |     |            | or by traversing a waveform.                    |
          |     |            |                                                 |
          |  1  | Key-point  | If set, this point is considered to be a model  |
          |     |            | key-point and thus generally should not be      |
          |     |            | withheld in a thinning algorithm.               |
          |     |            |                                                 |
          |  2  | Withheld   | If set, this point should not be included in    |
          |     |            | processing (synonymous with Deleted).           |
          |     |            |                                                 |
          |  3  | Overlap    | If set, this point is within the overlap        |
          |     |            | region of two or more swaths or takes. Setting  |
          |     |            | this bit is not mandatory (unless, of course,   |
          |     |            | it is mandated by a particular delivery         |
          |     |            | specification) but allows Classification of     |
          |     |            | overlap points to be preserved.                 |
          |-----|------------|-------------------------------------------------|

          Note that these bits are treated as flags and can be set or cleared
          in any combination. For example, a point with bits 0 and 1 both set
          to one and the Classification field set to 2 would be a ground point
          that had been synthetically collected and marked as a model
          key-point.
        */
        0: 'classificationFlags',
        1: 'classificationFlags',
        2: 'classificationFlags',
        3: 'classificationFlags',
        /*
          Scanner Channel is used to indicate the channel (scanner head) of a
          multi- channel system. Channel 0 is used for single scanner systems.
          Up to four channels are supported (0-3).
        */
        4: 'scannerChannel',
        5: 'scannerChannel',
        /*
          The Scan Direction Flag denotes the direction at which the scanner
          mirror was traveling at the time of the output pulse. A bit value
          of 1 is a positive scan direction, and a bit value of 0 is a negative
          scan direction (where positive scan direction is a scan moving from
          the left side of the in-track direction to the right side and
          negative the opposite).
        */
        6: 'direction',
        /*
          The Edge of Flight Line data bit has a value of 1 only when the point
          is at the end of a scan. It is the last point on a given scan line
          before it changes direction or the mirror facet changes. Note that
          this field has no meaning for 360° Field of View scanners (such as
          Mobile LIDAR scanners) and should not be set.
        */
        7: 'edge'
      }),
      name: 'mixedB'
    },
    { reader: unsignedChar, name: 'classification' },
    /*
      The Scan Angle is a signed short that represents the rotational position
      of the emitted laser pulse with respect to the vertical of the coordinate
      system of the data. Down in the data coordinate system is the 0.0 position.
      Each increment represents 0.006 degrees. Counter- Clockwise rotation, as
      viewed from the rear of the sensor, facing in the along-track (positive
      trajectory) direction, is positive. The maximum value in the positive
      sense is 30,000 (180 degrees which is up in the coordinate system of the
      data). The maximum value in the negative direction is -30.000 which is
      also directly up.
    */
    { reader: char, name: 'scanAngle' }
  ])
  .concat(bottom)
  .concat(gpsTime)

export default readerForReaders<IPoint>(
  pdrf6Parts
)
