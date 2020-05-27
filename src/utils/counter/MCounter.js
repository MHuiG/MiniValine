import util from './utils'
const MCounterFactory = function (option) {
  const root = this
  root.config = option
  window.MV.MC.util = util
  window.MV.MC.vc = option.vc
  util.Visitor(util)
  util.Counter()
}
module.exports = MCounterFactory
