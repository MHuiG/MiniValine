import dom from './plugins/dom'
import insertAtCaret from './insertAtCaret'
const smileEvt = (root) => {
  const vsmiles = root.el.querySelector('.vsmile-icons')
  dom.on('click', vsmiles, (e) => {
    const textField = root.el.querySelector('.veditor')
    const imgSrc = e.target.src
    if (typeof imgSrc === 'undefined') return
    const tag = `!(:${decodeURI(imgSrc).replace(/^.*\/(.*)$/, '$1')}:)`
    insertAtCaret(textField, tag)
    root.Comment.comment = textField.value
    const submitBtn = root.el.querySelector('.vsubmit')
    if (submitBtn.getAttribute('disabled')) {
      submitBtn.removeAttribute('disabled')
    }
  })
}

module.exports = smileEvt
