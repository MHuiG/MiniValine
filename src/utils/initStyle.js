const initStyle = (root) => {
  if (root.conf.closeCSS) return
  const Stylecheck = setInterval(function () {
    if (typeof Promise == 'undefined') { return }
    clearInterval(Stylecheck)
    if (root.conf.mode === 'DesertsP') {
      import(/* webpackChunkName: "style-DesertsP" */'../style/DesertsP.scss')
    } else if (root.conf.mode === 'xCss') {
      import(/* webpackChunkName: "style-xCss" */'../style/xCss.scss')
    }
    if (root.conf.barrager) {
      import(/* webpackChunkName: "style-barrager" */'../style/barrager.scss')
    }
    if (root.conf.dark) {
      import(/* webpackChunkName: "style-dark" */'../style/dark.scss')
    }
    if (root.conf.backend == 'waline') {
      import(/* webpackChunkName: "style-math" */'../style/math.scss')
    }
  }, 5)
}
module.exports = initStyle
