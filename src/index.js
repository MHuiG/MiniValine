import MiniValineFactory from './MiniValine'
import(/* webpackChunkName: "style" */'./style/index.scss')

const MiniValine = (option) => {
  return new MiniValineFactory(option)
}

module.exports = MiniValine
module.exports.default = MiniValine
