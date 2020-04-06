import dom from './plugins/dom'
const smileBtnEvt = (root) => {
  const smileBtn = root.el.querySelector('.vemoji-btn')
  const previewText = root.el.querySelector('.vpreview-text')
  const smileicons = root.el.querySelector('.vsmile-icons')
  dom.on('click', smileBtn, (e) => {
    if (previewText.getAttribute('triggered')) {
      previewText.setAttribute('style', 'display:none;')
      previewText.removeAttribute('triggered')
    }
    if (smileicons.getAttribute('triggered')) {
      smileicons.setAttribute('style', 'display:none;')
      smileicons.removeAttribute('triggered')
    } else {
      smileicons.removeAttribute('style')
      smileicons.setAttribute('triggered', 1)
    }
  })
}
module.exports = smileBtnEvt
