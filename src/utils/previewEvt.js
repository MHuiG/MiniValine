import MakeComment from './plugins/MakeComment'
const previewEvt = (root) => {
  root.previewEvt = (root) => {
    const previewBtn = root.el.querySelector('.vpreview-btn')
    const previewText = root.el.querySelector('.vpreview-text')
    const veditor = root.el.querySelector('.veditor')
    const render = (previewText) => {
      previewText.removeAttribute('style')
      previewText.setAttribute('triggered', 1)
      previewBtn.classList.add('actived')
      if (veditor.value) autosize(veditor)
      else autosize.destroy(veditor)
    }
    MakeComment(root, previewText, render)
  }
}
module.exports = previewEvt
