import util from './utils'
const MCounterFactory = function (option) {
  const root = this
  root.config = option
  window.MV.MC.util = util
  util.Visitor(util)
  util.Counter()
}
module.exports = MCounterFactory
