import getCache from './getCache'
const resetForm = (root) => {
  const smileicons = root.el.querySelector('.vsmile-icons')
  const previewText = root.el.querySelector('.vpreview-text')
  root.reset = () => {
    for (const i in root.mapping) {
      if (root.mapping.hasOwnProperty(i)) {
        const _v = root.mapping[i]
        const _el = root.el.querySelector(`.${i}`)
        _el.value = ''
        root.Comment[_v] = ''
      }
    }
    root.Comment.rid = ''
    root.Comment.nick = ''
    getCache(root)
    root.previewEvt(root)
    if (smileicons.getAttribute('triggered')) {
      smileicons.setAttribute('style', 'display:none;')
      smileicons.removeAttribute('triggered')
    }
    if (previewText.getAttribute('triggered')) {
      previewText.setAttribute('style', 'display:none;')
      previewText.removeAttribute('triggered')
    }
    root.el
      .querySelector('.vcancel-comment-reply')
      .setAttribute('style', 'display:none')
    root.el
      .querySelector('#vinputs-placeholder')
      .appendChild(root.el.querySelector('.vinputs-wrap'))
  }
}
module.exports = resetForm
