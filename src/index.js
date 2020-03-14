import './style/index.scss'
import MiniValineFactory from './MiniValine'

const MiniValine = (option) => {
  return new MiniValineFactory(option)
}

module.exports = MiniValine
module.exports.default = MiniValine
