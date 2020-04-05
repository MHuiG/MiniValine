import dom from './dom'
const expandEvt = (el) => {
  if (el.offsetHeight > 180) {
    el.classList.add('expand')
    dom.on('click', el, (e) => {
      el.setAttribute('class', 'vcomment')
    })
  }
}
module.exports = expandEvt
