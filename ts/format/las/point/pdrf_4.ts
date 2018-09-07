import { pdrf0Parts } from './pdrf_0'
import { gpsTime } from './pdrf_1'
import readerForReaders, { INamedReader } from '../../../reader/readerForReaders'
import unsignedChar from '../../../reader/type/uint8'
import unsignedLong from '../../../reader/type/uint32LE'
import unsignedLongLong from '../../../reader/type/uint64LE'
import float from '../../../reader/type/float'

export const extended: INamedReader[] = [
  /*
    This value plus 99 is the Record ID of the Waveform Packet Descriptor and indicates
    the User Defined Record that describes the waveform packet associated with this
    LIDAR point. Up to 255 different User Defined Records which describe the waveform
    packet are supported. A value of zero indicates that there is no waveform data
    associated with this LIDAR point record.
  */
  { reader: unsignedChar, name: 'wavePacketDescriptor' },
  /*
    The waveform packet data are stored in the LAS file in an Extended Variable Length
    Record or in an auxiliary WPD file. The Byte Offset represents the location of the
    start of this LIDAR points’ waveform packet within the waveform data variable
    length record (or external file) relative to the beginning of the Waveform Packet
    Data header. The absolute location of the beginning of this waveform packet relative
    to the beginning of the file is given by:

    >  Start of Waveform Data Packet Record + Byte offset to Waveform Packet Data

    for waveform packets stored within the LAS file and

    >  Byte offset to Waveform Packet Data

    for data stored in an auxiliary file
  */
  { reader: unsignedLongLong, name: 'wavePacketByteOffset' },
  /*
    The size, in bytes, of the waveform packet associated with this return. Note that
    each waveform can be of a different size (even those with the same Waveform
    Packet Descriptor index) due to packet compression. Also note that waveform
    packets can be located only via the Byte offset to Waveform Packet Data value
    since there is no requirement that records be stored sequentially.
  */
  { reader: unsignedLong, name: 'wavePacketSize' },
  /*
    The offset in picoseconds (10-12) from the first digitized value to the location
    within the waveform packet that the associated return pulse was detected.
  */
  { reader: float, name: 'returnPointLocation' },
  /*
    These parameters define a parametric line equation for extrapolating points along
    the associated waveform. The position along the wave is given by:

    >  X = X0 + X(t)
    >  Y = Y0 + Y(t)
    >  Z = Z0 + Z(t)

    where X, Y and Z are the spatial position of the derived point, X0, Y0, Z0 are
    the position of the “anchor” point (the X, Y, Z locations from this point’s
    data record) and t is the time, in picoseconds, relative to the anchor point
    (i.e. t = zero at the anchor point). The units of X, Y and Z are the units of
    the coordinate systems of the LAS data. If the coordinate system is geographic,
    the horizontal units are decimal degrees and the vertical units are meters.
  */
  { reader: float, name: 'xt' },
  { reader: float, name: 'yt' },
  { reader: float, name: 'zt' }
]

export default readerForReaders(
  pdrf0Parts
    .concat(gpsTime)
    .concat(extended)
)
