const ActivateCode = (root) => {
  root.ActivateCode = (root) => {
    setTimeout(function () {
      if (document.getElementsByTagName('pre').length) {
        import(/* webpackChunkName: "md-style" */ 'highlight.js/styles/github.css')
      }
    }, 500)
    if (root.conf.backend == 'waline') return
    if (!root.conf.math) return
    import(/* webpackChunkName: "math" */'./plugins/MathJax').then(({ MathJaxSupport }) => {
      MathJaxSupport(root)
    })
  }
}
module.exports = ActivateCode
