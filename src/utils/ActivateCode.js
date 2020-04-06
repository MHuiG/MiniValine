import MathJaxSupport from './plugins/MathJax'
const ActivateCode = (root) => {
  root.ActivateCode = (root) => {
    MathJaxSupport(root)
    setTimeout(function () {
      if (document.getElementsByTagName('pre').length) {
        import(/* webpackChunkName: "md-style" */ 'highlight.js/styles/github.css')
      }
    }, 500)
  }
}
module.exports = ActivateCode
