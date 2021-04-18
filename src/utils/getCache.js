const getCache = (root) => {
  let s = localStorage && localStorage.getItem('_ohhho')
  if (s) {
    s = JSON.parse(s)
    const m = ['nick', 'link', 'mail']
    for (let i = 0; i < m.length; i++) {
      const k = m[i]
      root.el.querySelector(`.v${k}`).value = s[k]
      root.C[k] = s[k]
    }
  }
}
module.exports = getCache
