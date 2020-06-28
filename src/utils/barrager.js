const barrager = (root) => {
  import(/* webpackChunkName: "barrager" */'./plugins/barrager.js').then(({ barrager }) => {
    barrager()
  })
}
module.exports = barrager
