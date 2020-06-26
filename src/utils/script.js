import { pf } from '../Default'
import getScript from './plugins/getScript'
import GetIP from './plugins/GetIP'
const script = (root) => {
  if (!root.config.NoRecordIP) {
    if (typeof window.MV.ip == 'undefined') {
      GetIP(root)
    } else {
      root.C.ip = window.MV.ip
    }
  }
  if (typeof window.MV.pf == 'undefined') {
    getScript(pf)
    window.MV.pf = true
  }
  if ((typeof root.config.danmu == 'undefined') || (root.config.danmu)) {
    if (typeof window.MV.danmu == 'undefined') {
      var style = document.createElement('link')
      style.rel = 'stylesheet'
      style.type = 'text/css'
      style.href = 'https://cdn.jsdelivr.net/gh/yaseng/jquery.barrager.js@master/dist/css/barrager.css'
      document.getElementsByTagName('head')[0].appendChild(style)
      if (typeof jQuery == 'undefined') {
        getScript('https://cdn.jsdelivr.net/npm/jquery')
      }
      var checkjq = setInterval(function () {
        if (typeof jQuery == 'undefined') return
        clearInterval(checkjq)
        getScript('https://cdn.jsdelivr.net/gh/yaseng/jquery.barrager.js@master/dist/js/jquery.barrager.min.js')
      }, 5)
      window.MV.danmu = true
    }
  }
}
module.exports = script
