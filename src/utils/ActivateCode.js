const ActivateCode = (root) => {
  root.ActivateCode = (root, t = 0) => {
    setTimeout(function () {
      if (document.getElementsByTagName('pre').length) {
        import(/* webpackChunkName: "md-style" */ 'highlight.js/styles/github.css')
      }
    }, 500)
    if (root.math == false) return
    import(/* webpackChunkName: "math" */'./plugins/MathJax').then(({ MathJaxSupport }) => {
      MathJaxSupport(root, t)
    })
  }
}
module.exports = ActivateCode
