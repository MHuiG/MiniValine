import dom from './dom'
const startEvt = (root) => {
  const commentTrigger = root.el.querySelector('.commentTrigger')
  dom.on('click', commentTrigger, (e) => {
    commentTrigger.setAttribute('style', 'display:none')
    root.el.querySelector('.auth-section').removeAttribute('style')
    root.el.querySelector('.veditor').focus()
  })
}
module.exports = startEvt
