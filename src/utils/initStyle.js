const initStyle = (root) => {
  if (root.config.closeCSS) return
  const Stylecheck = setInterval(function () {
    if (typeof Promise == 'undefined') { return }
    clearInterval(Stylecheck)
    if (root.mode === 'DesertsP') {
      import(/* webpackChunkName: "style-DesertsP" */'../style/DesertsP.scss')
    } else if (root.mode === 'xCss') {
      import(/* webpackChunkName: "style-xCss" */'../style/xCss.scss')
    }
    if (root.config.barrager) {
      import(/* webpackChunkName: "style-barrager" */'../style/barrager.scss')
    }
    if (root.config.dark) {
      import(/* webpackChunkName: "style-dark" */'../style/dark.scss')
    }
    if (root.backend == 'waline') {
      import(/* webpackChunkName: "style-math" */'../style/math.scss')
    }
  }, 5)
}
module.exports = initStyle
