const barrager = (root) => {
  window.MV.barrager = {}
  window.MV.barrager.enable = 1
  import(/* webpackChunkName: "barrager" */'./plugins/barrager.js').then(({ barrager }) => {
    barrager()
  })
}
module.exports = barrager
