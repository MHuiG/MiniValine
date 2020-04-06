const MathJaxSupport = (root) => {
  if ((typeof MathJax === 'undefined') && (root.math || typeof root.config.math == 'undefined')) {
    if ((root.math == 2) || (root.math == true) || (root.math == undefined)) {
      import(/* webpackChunkName: "math2" */'./initMathJax2.js').then(({ initMathJax }) => {
        initMathJax()
      })
    } else if (root.math == 3) {
      import(/* webpackChunkName: "math3" */'./initMathJax3.js').then(({ initMathJax }) => {
        initMathJax()
      })
    }
  }
  if (typeof MathJax !== 'undefined') {
    setTimeout(function () {
      if ((root.math == 2) || (root.math == true) || (root.math == undefined)) {
        MathJax.Hub.Typeset(document.getElementsByClassName('MiniValine'))
      }
      if (root.math == 3) {
        MathJax.typeset()
      }
    }, 200)
  }
}
module.exports = MathJaxSupport
