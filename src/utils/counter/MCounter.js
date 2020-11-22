import util from './utils'
const MCounterFactory = function (option) {
  const root = this
  root.config = option
  window.MV.MC.util = util
  window.MV.MC.vc = option.vc
  util.Visitor(util)
  if ((!root.config.backend) || (root.config.backend == 'lc')) {
    import(/* webpackChunkName: "fetch-lc-counter" */'./utils/LC-Counter.js').then(({ Counter }) => {
      Counter()
    })
  }
}
module.exports = MCounterFactory
