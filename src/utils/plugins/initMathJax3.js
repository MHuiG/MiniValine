import getScript from './getScript'
const init = () => {
  const script = document.createElement('script')
  script.text = `
window.MathJax = {
  tex: {
    inlineMath: [ ['$','$'] ],
    displayMath: [ ['$$','$$']]
  },
  options: {
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre','code', 'a', 'annotation', 'annotation-xml'],
    ignoreHtmlClass: 'tex2jax_ignore',
    processHtmlClass: 'tex2jax_process'
  },
};
`
  document.getElementsByTagName('body')[0].appendChild(script)
  getScript('https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml-full.js')
}
export function initMathJax () {
  init()
}
