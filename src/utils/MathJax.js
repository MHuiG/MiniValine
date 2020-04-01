const MathJaxSupport = (root) => {
  if ((typeof MathJax === 'undefined') && (root.math || typeof root.config.math == 'undefined')) {
    import('./initMathJax.js').then(({ initMathJax }) => {
      initMathJax()
    })
  }
  if (typeof MathJax !== 'undefined') {
    MathJax.Hub.Typeset(document.getElementsByClassName('MiniValine'))
  }
}
module.exports = MathJaxSupport
