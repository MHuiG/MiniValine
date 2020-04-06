import dom from './plugins/dom'
import MakeComment from './plugins/MakeComment'
import MathJaxSupport from './plugins/MathJax'
const previewBtnEvt = (root) => {
  const previewBtn = root.el.querySelector('.vpreview-btn')
  const previewText = root.el.querySelector('.vpreview-text')
  const smileicons = root.el.querySelector('.vsmile-icons')
  dom.on('click', previewBtn, (e) => {
    if (smileicons.getAttribute('triggered')) {
      smileicons.setAttribute('style', 'display:none;')
      smileicons.removeAttribute('triggered')
    }
    if (previewText.getAttribute('triggered')) {
      previewText.setAttribute('style', 'display:none;')
      previewText.removeAttribute('triggered')
    } else {
      if (root.Comment.comment === '') {
        root.inputs.comment.focus()
        return
      }
      // render markdown
      const render = (previewText) => {
        previewText.innerHTML = previewText.TEXT
        previewText.removeAttribute('style')
        previewText.setAttribute('triggered', 1)
        MathJaxSupport(root)
      }
      MakeComment(root, previewText, render)
    }
  })
}
module.exports = previewBtnEvt
