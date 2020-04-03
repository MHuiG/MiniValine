import dom from './dom'
const alert = (root) => {
  const mark = root.el.querySelector('.vmark')
  root.alert = {
    show (o) {
      mark.innerHTML = `<div class="valert txt-center"><div class="vtext">${o.text}</div><div class="vbtns"></div></div>`
      const vbtns = mark.querySelector('.vbtns')
      const cBtn = `<button class="vcancel vbtn">${(o.ctxt) || root.i18n.cancel}</button>`
      const oBtn = `<button class="vsure vbtn">${(o.otxt) || root.i18n.continue}</button>`
      vbtns.innerHTML = `${cBtn}${o.type && oBtn}`
      mark.querySelector('.vcancel').addEventListener('click', (e) => {
        root.alert.hide()
      })
      mark.setAttribute('style', 'display:block;')
      if (o.type) {
        const ok = mark.querySelector('.vsure')
        dom.on('click', ok, (e) => {
          root.alert.hide()
          o.cb && o.cb()
        })
      }
    },
    hide () {
      mark.setAttribute('style', 'display:none;')
    }
  }
}
module.exports = alert
