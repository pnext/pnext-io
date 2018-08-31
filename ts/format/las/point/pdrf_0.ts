import long from '../../../reader/type/int32LE'
import unsignedShort from '../../../reader/type/uint16LE'
import char from '../../../reader/type/int8'
import bits from '../../../reader/util/bits'
import unsignedChar from '../../../reader/type/uint8'
import IFeature from '../../../api/IFeature'
import readerForReaders from '../../../reader/readerForReaders'
import flatReader from '../../../reader/util/flatReader'

export const base = [
  /*
    The X, Y, and Z values are stored as long integers. The X, Y, and Z values are
    used in conjunction with the scale values and the offset values to determine
    the coordinate for each point as described in the Public Header Block section.
  */
  { reader: long, name: 'x' },
  { reader: long, name: 'y' },
  { reader: long, name: 'z' },
  /*
    The intensity value is the integer representation of the pulse return magnitude.
    This value is optional and system specific. However, it should always be
    included if available. Intensity, when included, is always normalized to a
    16 bit, unsigned value by multiplying the value by 65,536/(intensity dynamic
    range of the sensor). For example, if the dynamic range of the sensor is 10
    bits, the scaling value would be (65,536/1,024). If intensity is not included,
    this value must be set to zero. This normalization is required to ensure that
    data from different sensors can be correctly merged.
  */
  { reader: unsignedShort, name: 'Intensity' }
]

export const bottom = [
  /*
    This field may be used at the user’s discretion.
  */
  { reader: unsignedChar, name: 'User Data' },
  /*
    This value indicates the file from which this point originated. Valid values for
    this field are 1 to 65,535 inclusive with zero being used for a special case
    discussed below. The numerical value corresponds to the File Source ID from which
    this point originated. Zero is reserved as a convenience to system implementers.
    A Point Source ID of zero implies that this point originated in this file. This
    implies that processing software should set the Point Source ID equal to the File
    Source ID of the file containing this point at some time during processing.
  */
  { reader: unsignedShort, name: 'Point Source ID' }
]

export const pdrf0Parts = base.concat([
  {
    reader: bits({
      /*
        The Return Number is the pulse return number for a given output pulse. A
        given output laser pulse can have many returns, and they must be marked in
        sequence of return. The first return will have a Return Number of one, the
        second a Return Number of two, and so on up to five returns.
      */
      0: 'Return Number',
      1: 'Return Number',
      2: 'Return Number',
      /*
        The Number of Returns is the total number of returns for a given pulse.
        For example, a laser data point may be return two (Return Number) within
        a total number of five returns.
      */
      3: 'Number of Returns (given pulse)',
      4: 'Number of Returns (given pulse)',
      5: 'Number of Returns (given pulse)',
      /*
        The Scan Direction Flag denotes the direction at which the scanner mirror
        was traveling at the time of the output pulse. A bit value of 1 is a
        positive scan direction, and a bit value of 0 is a negative scan direction
        (where positive scan direction is a scan moving from the left side of the
        in-track direction to the right side and negative the opposite).
      */
      6: 'Scan Direction Flag',
      /*
        The Edge of Flight Line data bit has a value of 1 only when the point is
        at the end of a scan. It is the last point on a given scan line before it
        changes direction.
      */
      7: 'Edge of Flight Line'
    }),
    name: 'mixed'
  },
  /*
    This field represents the “class” attributes of a point. If a point has never
    been classified, this byte must be set to zero. The format for classification
    is a bit encoded field with the lower five bits used for the class and the
    three high bits used for flags. The bit definitions and the classification
    values are listed below:

    Classification Bit Field Encoding

    | Bit | Field Name     | Description                                       |
    |-----|----------------|---------------------------------------------------|
    | 0:4 | Classification | Standard ASPRS classification from 0 - 31 as      |
    |     |                | defined in the classification table for legacy    |
    |     |                | point formats (see next table)                    |
    |     |                |                                                   |
    | 5   | Synthetic      | If set then this point was created by a technique |
    |     |                | other than LIDAR collection such as digitized from|
    |     |                | a photogrammetric stereo model or by traversing a |
    |     |                | waveform.                                         |
    |     |                |                                                   |
    | 6   | Key-point      | If set, this point is considered to be a model    |
    |     |                | key-point and thus generally should not be        |
    |     |                | withheld in a thinning algorithm.                 |
    |     |                |                                                   |
    | 7   | Withheld       | If set, this point should not be included in      |
    |     |                | processing (synonymous with Deleted).             |
    |-----|----------------|---------------------------------------------------|

    Note that bits 5, 6 and 7 are treated as flags and can be set or clear in
    any combination. For example, a point with bits 5 and 6 both set to one and
    the lower five bits set to 2 would be a ground point that had been
    Synthetically collected and marked as a model key-point.
   */
  { reader: unsignedChar, name: 'Classification' },
  /*
    The Scan Angle Rank is a signed one-byte number with a valid range
    from - 90 to +90. The Scan Angle Rank is the angle (rounded to the
    nearest integer in the absolute
  */
  { reader: char, name: '`Scan Angle' }
]).concat(bottom)

export default flatReader(readerForReaders(pdrf0Parts))
