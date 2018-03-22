import PerspectiveCamera from './PerspectiveCamera'
import RelevanceRange from './RelevanceRange'
import DensityRange from './DensityRange'
import CutRange from './CutRange'

export default class Query {
  cam: PerspectiveCamera
  relevance?: RelevanceRange
  density?: DensityRange
  cut?: CutRange
  feature?: Array<String>
}
