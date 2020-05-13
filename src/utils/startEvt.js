import dom from './plugins/dom'
const startEvt = (root) => {
  const Trigger = root.el.querySelector('.commentTrigger')
  dom.on('click', Trigger, (e) => {
    Trigger.setAttribute('style', 'display:none')
    root.el.querySelector('.auth-section').removeAttribute('style')
    root.el.querySelector('.veditor').focus()
  })
}
module.exports = startEvt
