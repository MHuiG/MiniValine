import { VERSION } from './Default'
const MiniValine = (option) => {
  if (!window.MV) {
    console.log('%c MiniValine %c v' + VERSION + ' ', 'color: white; background: #0078E7; padding:5px 0;', 'padding:4px;border:1px solid #0078E7;')
    window.MV = Object.create(null)
    window.MV.v = VERSION
  }
  const Factory = require('./Factory')
  return new Factory(option)
}
module.exports = MiniValine
module.exports.default = MiniValine
