const MCounterFactory = function (option) {
  const root = this
  root.conf = option
  window.MV.MC.vc = option.vc
  if ((!root.conf.backend) || (root.conf.backend == 'lc')) {
    import(/* webpackChunkName: "fetch-lc-counter" */'./utils/LC-Counter.js').then(({ Counter }) => {
      Counter()
    })
  } else if (root.conf.backend == 'waline') {
    import(/* webpackChunkName: "fetch-waline-counter" */'./utils/Waline-Counter.js').then(({ Counter }) => {
      Counter(root)
    })
  }
}
module.exports = MCounterFactory
