import dom from './plugins/dom'
const alert = (root) => {
  const mark = root.el.querySelector('.vmark')
  root.alert = {
    show (o) {
      mark.innerHTML = `<div class="valert txt-center"><div class="vtext">${o.text}</div><div class="vbtns"></div></div>`
      if (o.type == 3) {
        mark.setAttribute('style', 'display:block;')
        o.cb && o.cb()
      } else if (o.type == 2) {
        const vbtns = mark.querySelector('.vbtns')
        const cBtn = `<button class="vsure vbtn">${(o.ctxt) || root.i18n.continue}</button>`
        vbtns.innerHTML = cBtn
        mark.setAttribute('style', 'display:block;')
        const ok = mark.querySelector('.vsure')
        dom.on('click', ok, (e) => {
          o.cb && o.cb()
        })
      } else {
        const vbtns = mark.querySelector('.vbtns')
        const cBtn = `<button class="vcancel vbtn">${(o.ctxt) || root.i18n.cancel}</button>`
        const oBtn = `<button class="vsure vbtn">${(o.otxt) || root.i18n.continue}</button>`
        vbtns.innerHTML = `${cBtn}${o.type ? oBtn : ''}`
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
      }
    },
    hide () {
      mark.setAttribute('style', 'display:none;')
    }
  }
  root.error = (status, data) => {
    console.error(status)
    console.error(data)
    let msg = data
    if (data.errmsg || data.message || data.msg) {
      msg = data.errmsg || data.message || data.msg
    } else {
      try {
        msg = JSON.stringify(data)
      } catch (e) {
        msg = 'ERROR'
      }
    }

    if (msg === '""') {
      msg = 'network error'
    }
    root.alert.show({
      type: 0,
      text: msg,
      ctxt: root.i18n.confirm
    })

    root.el.querySelector('.vsubmit').removeAttribute('disabled-submit')
    root.submitting.hide()
    root.nodata.hide()
    // root.reset()
  }
}
module.exports = alert
