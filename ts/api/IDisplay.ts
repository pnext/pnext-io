import IPerspectiveCamera from './IPerspectiveCamera'
import IDensityRange from './IDensityRange'

export default interface IDisplay {
  density?: IDensityRange
  cam: IPerspectiveCamera
}
