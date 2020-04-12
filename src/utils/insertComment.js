import dom from './plugins/dom'
const insertComment = (root, body) => {
  root.insertComment = (comment, vlist = null, top = true) => {
    const _vcard = document.createElement('li')
    _vcard.setAttribute('class', 'vcard')
    _vcard.setAttribute('id', comment.id)
    _vcard.innerHTML = body.vcard(root, comment)
    root.ActivateCode(root)
    const _vlist = vlist || root.el.querySelector('.vlist')
    const _vlis = _vlist.querySelectorAll('li')
    const _as = _vcard.querySelectorAll('a')
    for (let i = 0, len = _as.length; i < len; i++) {
      const item = _as[i]
      if (item && item.getAttribute('class') !== 'at') {
        item.setAttribute('target', '_blank')
        item.setAttribute('rel', 'nofollow')
      }
    }
    if (!top) _vlist.appendChild(_vcard)
    else _vlist.insertBefore(_vcard, _vlis[0])
    const _vcontent = _vcard.querySelector('.vcomment')
    expandEvt(_vcontent)
    root.AtEvt(_vcard)
    return _vcard
  }
  const expandEvt = (el) => {
    if (el.offsetHeight > 180) {
      el.classList.add('expand')
      dom.on('click', el, (e) => {
        el.setAttribute('class', 'vcomment')
      })
    }
  }
}
module.exports = insertComment
