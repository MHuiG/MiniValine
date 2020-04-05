import dom from './dom'
const atEvt = (root) => {
  root.AtEvt = (vcard) => {
    const _id = vcard.getAttribute('id')
    const _vat = vcard.querySelector(`#at-${_id}`)
    dom.on('click', _vat, (e) => {
      const at = _vat.getAttribute('at')
      const rid = _vat.getAttribute('rid')
      root.Comment.rid = rid
      root.Comment.at = at
      root.inputs.comment.value = `${at} , ${root.inputs.comment.value}`
      // move inputs
      const commentEl = vcard.querySelector(`#comment-${_id}`)
      commentEl.appendChild(root.el.querySelector('.vinputs-wrap'))
      root.el.querySelector('.vcancel-comment-reply').removeAttribute('style')
      // remove comment trigger
      root.el.querySelector('.commentTrigger').setAttribute('style', 'display:none')
      root.el.querySelector('.auth-section').removeAttribute('style')
      root.el.querySelector('.veditor').focus()
      // focus
      root.inputs.comment.focus()
    })
  }
}
module.exports = atEvt
