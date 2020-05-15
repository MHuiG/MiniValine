import dom from './plugins/dom'
const smileBtnEvt = (root) => {
  const smileBtn = root.el.querySelector('.vemoji-btn')
  const previewBtn = root.el.querySelector('.vpreview-btn')
  const previewText = root.el.querySelector('.vpreview-text')
  const smileicons = root.el.querySelector('.vsmile-body')
  dom.on('click', smileBtn, (e) => {
    if (previewText.getAttribute('triggered')) {
      previewText.setAttribute('style', 'display:none;')
      previewText.removeAttribute('triggered')
      previewBtn.classList.remove('actived')
    }
    if (smileicons.getAttribute('triggered')) {
      smileicons.setAttribute('style', 'display:none;')
      smileicons.removeAttribute('triggered')
      smileBtn.classList.remove('actived')
    } else {
      smileicons.removeAttribute('style')
      smileicons.setAttribute('triggered', 1)
      smileBtn.classList.add('actived')
    }
  })
}
module.exports = smileBtnEvt
