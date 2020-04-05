const MathJaxSupport = (root) => {
  if ((typeof MathJax === 'undefined') && (root.math || typeof root.config.math == 'undefined')) {
    import(/* webpackChunkName: "math" */'./plugins/initMathJax.js').then(({ initMathJax }) => {
      initMathJax()
    })
  }
  if (typeof MathJax !== 'undefined') {
    setTimeout(function () {
      MathJax.Hub.Typeset(document.getElementsByClassName('MiniValine'))
    }, 200)
  }
}
module.exports = MathJaxSupport
