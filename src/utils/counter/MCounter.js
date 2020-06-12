import util from './utils'
const MCounterFactory = function (option) {
  const root = this
  root.config = option
  window.MV.MC.util = util
  window.MV.MC.vc = option.vc
  window.MV.MC.lS = option.localStorage
  util.Visitor(util)
  util.Counter()
}
module.exports = MCounterFactory
