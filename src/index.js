import MiniValineFactory from './MiniValine'
import { VERSION } from './Default'
import(/* webpackChunkName: "style" */'./style/index.scss')
const MiniValine = (option) => {
  console.log('%c MiniValine %c v' + VERSION + ' ', 'color: white; background: #0078E7; padding:5px 0;', 'padding:4px;border:1px solid #0078E7;')
  return new MiniValineFactory(option)
}
module.exports = MiniValine
module.exports.default = MiniValine
