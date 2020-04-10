import getScriptfun from './getScriptfun'
const init = () => {
  const script = document.createElement('script')
  script.type = 'text/x-mathjax-config'
  script.text = `MathJax.Ajax.config.path['mhchem']='https://cdn.jsdelivr.net/npm/mathjax-mhchem@3';MathJax.Hub.Config({elements: [document.getElementsByClassName('MiniValine')],tex2jax:{inlineMath: [['$', '$']],processEscapes:true,skipTags:['script','noscript','style','textarea','pre','code']},TeX:{extensions:['[mhchem]/mhchem.js'],equationNumbers:{autoNumber:'AMS'}}});MathJax.Hub.Register.StartupHook('TeX Jax Ready',function(){MathJax.InputJax.TeX.prefilterHooks.Add(function(data){if(data.display){var next=data.script.nextSibling;while(next&&next.nodeName.toLowerCase()==='#text'){next=next.nextSibling;}if(next&&next.nodeName.toLowerCase()==='br'){next.parentNode.removeChild(next);}}});})`
  document.getElementsByTagName('body')[0].appendChild(script)
  getScriptfun(
    'https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js?config=TeX-AMS-MML_HTMLorMML',
    () => {
      MathJax.Hub.Typeset()
    },
    window.MathJax
  )
}
export function initMathJax () {
  init()
}
