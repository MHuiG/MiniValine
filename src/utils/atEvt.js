import dom from './plugins/dom'
const atEvt = (root) => {
  root.AtEvt = (vcard) => {
    const _id = vcard.getAttribute('id')
    const _vat = vcard.querySelector(`#at-${_id}`)
    dom.on('click', _vat, (e) => {
      const at = _vat.getAttribute('at')
      const rid = _vat.getAttribute('rid')
      root.C.rid = rid
      root.C.at = at
      root.el.querySelector('.vinputs-area  textarea').placeholder = at
      root.inputs.comment.value = `${root.inputs.comment.value}`
      // move inputs
      const commentEl = vcard.querySelector(`#comment-${_id}`)
      try { commentEl.appendChild(root.el.querySelector('.vinputs-wrap')) } catch (e) {}
      root.el.querySelector('.vcancel-comment-reply').removeAttribute('style')
      // focus
      root.inputs.comment.focus()
    })
  }
}
module.exports = atEvt
