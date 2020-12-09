export const MathJaxSupport = (root) => {
  if ((typeof MathJax === 'undefined') && root.config.math) {
    import(/* webpackChunkName: "math" */'./initMathJax3.js').then(({ initMathJax }) => {
      initMathJax()
    })
  }
  if (typeof MathJax !== 'undefined') {
    makeMath()
  }
}
const makeMath = () => {
  try {
    if (MathJax.version.substr(0, 1) === '2') {
      MathJax.Hub.Typeset(document.getElementsByClassName('MiniValine'))
    } else if (MathJax.version.substr(0, 1) === '3') {
      MathJax.typeset()
    }
  } catch (e) {}
}
