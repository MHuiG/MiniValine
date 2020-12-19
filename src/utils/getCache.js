const getCache = (root) => {
  let s = localStorage && localStorage.getItem('MiniValineCache')
  if (s) {
    s = JSON.parse(s)
    const m = ['nick', 'link', 'mail']
    for (let i = 0; i < m.length; i++) {
      const k = m[i]
      root.el.querySelector(`.v${k}`).value = s[k]
      root.C[k] = s[k]
    }
    if ((s.mail !== '') && (root.conf.mode === 'DesertsP')) {
      const el = root.el.querySelector('.visitor_avatar')
      el.setAttribute('data-src', `${root.conf.avatarUrl + '/' + md5(s.mail.toLowerCase().trim())}?s=48&d=${root.conf.avatarD}`)
    }
  }
}
module.exports = getCache
