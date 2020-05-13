const initStyle = (root) => {
  var Stylecheck = setInterval(function () {
    if (typeof Promise == 'undefined') { return }
    clearInterval(Stylecheck)
    if(root.mode==='DesertsP'){
		import(/* webpackChunkName: "style-DesertsP" */'../style/DesertsP.scss')
	}else if(root.mode==='xCss'){
		import(/* webpackChunkName: "style-xCss" */'../style/xCss.scss')
	}
  }, 5)
}
module.exports = initStyle
