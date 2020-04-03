const initStyle = () => {
  var Stylecheck = setInterval(function () {
    if (typeof Promise == 'undefined') { return }
    clearInterval(Stylecheck)
    import(/* webpackChunkName: "style" */'../style/index.scss')
  }, 5)
}
module.exports = initStyle
