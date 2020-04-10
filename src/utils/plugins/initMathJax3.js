import getScript from './getScript'
const init = () => {
  const script = document.createElement('script')
  script.text = `window.MathJax = {tex: {inlineMath: [ ['$','$'] ]}}`
  document.getElementsByTagName('body')[0].appendChild(script)
  getScript('https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js')
}
export function initMathJax () {
  init()
}
