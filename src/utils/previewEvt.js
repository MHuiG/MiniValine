import MakeComment from './plugins/MakeComment'
const previewEvt = (root) => {
  root.previewEvt = (root) => {
    const previewText = root.el.querySelector('.vpreview-text')
    const veditor = root.el.querySelector('.veditor')
    const render = (previewText) => {
      previewText.innerHTML = previewText.TEXT
      previewText.removeAttribute('style')
      previewText.setAttribute('triggered', 1)
      if (veditor.value) autosize(veditor)
      else autosize.destroy(veditor)
      root.ActivateCode(root)
    }
    MakeComment(root, previewText, render)
  }
}
module.exports = previewEvt
