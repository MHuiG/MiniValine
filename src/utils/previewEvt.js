import MakeComment from './plugins/MakeComment'
const previewEvt = (root) => {
  root.previewEvt = (root, t = 0) => {
    const previewBtn = root.el.querySelector('.vpreview-btn')
    const previewText = root.el.querySelector('.vpreview-text')
    const veditor = root.el.querySelector('.veditor')
    const render = (previewText) => {
      previewText.preview = true
      previewText.innerHTML = previewText.TEXT
      previewText.removeAttribute('style')
      previewText.setAttribute('triggered', 1)
      previewBtn.classList.add('actived')
      if (veditor.value) autosize(veditor)
      else autosize.destroy(veditor)
      root.ActivateCode(root, t)
    }
    MakeComment(root, previewText, render)
  }
}
module.exports = previewEvt
