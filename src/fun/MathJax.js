const MathJaxSupport = (opt) => {
  if ((typeof MathJax === 'undefined') && opt) {
    initMathJax()
  }
  if (typeof MathJax !== 'undefined') {
    MathJax.Hub.Typeset()
  }
}

const initMathJax = () => {
  const script = document.createElement('script')
  script.type = 'text/x-mathjax-config'
  script.text = `
			MathJax.Ajax.config.path['mhchem'] = 'https://cdn.jsdelivr.net/npm/mathjax-mhchem@3';
			MathJax.Hub.Config({
				tex2jax: {
				  inlineMath: [ ['$', '$'], ['\\(', '\\)'] ],
				  processEscapes: true,
				  skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
				},
				TeX: {
				  extensions: ['[mhchem]/mhchem.js'],
				  equationNumbers: {
					autoNumber: 'AMS'
				  }
				}
			});
			MathJax.Hub.Register.StartupHook('TeX Jax Ready', function() {
				MathJax.InputJax.TeX.prefilterHooks.Add(function(data) {
				  if (data.display) {
					var next = data.script.nextSibling;
					while (next && next.nodeName.toLowerCase() === '#text') {
					  next = next.nextSibling;
					}
					if (next && next.nodeName.toLowerCase() === 'br') {
					  next.parentNode.removeChild(next);
					}
				  }
				});
			});
					`
  document.body.append(script)
  getScript(
    'https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js?config=TeX-AMS-MML_HTMLorMML',
    () => {
      MathJax.Hub.Typeset()
    },
    window.MathJax
  )
}

const getScript = (url, callback, condition) => {
  if (condition) {
    callback()
  } else {
    let script = document.createElement('script')
    script.onload = script.onreadystatechange = (_, isAbort) => {
      if (
        isAbort ||
        !script.readyState ||
        /loaded|complete/.test(script.readyState)
      ) {
        script.onload = script.onreadystatechange = null
        script = undefined
        if (!isAbort && callback) setTimeout(callback, 0)
      }
    }
    script.src = url
    document.head.append(script)
  }
}
module.exports = MathJaxSupport
