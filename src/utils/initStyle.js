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
    if ((typeof root.config.danmu == 'undefined') || (root.config.danmu)) {
      import(/* webpackChunkName: "style-barrager" */'../style/barrager.scss')
    }
    if (root.config.dark) {
      import(/* webpackChunkName: "style-dark" */'../style/dark.scss')
    }
  }, 5)
}
module.exports = initStyle
