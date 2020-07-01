import { i18nUrl } from '../Default'
import ajax from './plugins/ajax'

const i18n = (root) => {
  if (!window.MV.i18n) {
    let s = localStorage && localStorage.getItem('MiniValineI18n')
    if (s) {
      s = JSON.parse(s)
      if (s.lang == root.lang) {
        root.i18n = s.i18n
        window.MV.i18n = root.i18n
        window.MV.getI18n = 0
      } else {
        window.MV.getI18n = 1
      }
    } else {
      window.MV.getI18n = 1
    }
    if (window.MV.getI18n) {
      ajax({
        url: i18nUrl + root.lang + '/index.json',
        type: 'GET',
        success: function (data) {
          data = eval('(' + data + ')')
          root.i18n = data
          window.MV.i18n = root.i18n
          localStorage && localStorage.setItem(
            'MiniValineI18n',
            JSON.stringify({
              lang: root.lang,
              i18n: root.i18n
            })
          )
        }
      })
    }
  } else {
    root.i18n = window.MV.i18n
    window.MV.getI18n = 0
  }
}
module.exports = i18n
