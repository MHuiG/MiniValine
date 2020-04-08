import { GravatarBaseUrl } from '../Default'
const getCache = (root) => {
  let s = localStorage && localStorage.getItem('MiniValineCache')
  if (s) {
    s = JSON.parse(s)
    const m = ['nick', 'link', 'mail']
    for (let i = 0; i < m.length; i++) {
      const k = m[i]
      root.el.querySelector(`.v${k}`).value = s[k]
      root.Comment[k] = s[k]
    }
    if (s.mail !== '') {
      const el = root.el.querySelector('.visitor_avatar')
      el.setAttribute('data-src', `${GravatarBaseUrl + md5(s.mail.toLowerCase().trim())}?size=80&d=https%3a%2f%2fgravatar.loli.net%2favatar%2f9e63c80900d106cbbec5a9f4ea433a3e.jpg%3fsize%3d80`)
    }
  }
}
module.exports = getCache
