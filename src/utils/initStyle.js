const initStyle = (root) => {
  var Stylecheck = setInterval(function () {
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
  }, 5)
}
module.exports = initStyle
