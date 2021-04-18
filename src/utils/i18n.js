import { i18nUrl } from '../Default'
import ajax from './plugins/ajax'

const i18n = (root) => {
  if (!window.MV.i18n) {
    let s = localStorage && localStorage.getItem('_ohhhoI18n')
    if (s) {
      s = JSON.parse(s)
      if (s.lang == root.conf.lang) {
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
      const temp = root.conf.lang.split('-')
      if (temp.length == 2) {
        root.conf.lang = temp[0] + '-' + temp[1].toUpperCase()
      }
      ajax({
        url: i18nUrl + root.conf.lang + '/index.json',
        type: 'GET',
        success: function (data) {
          root.i18n = data
          window.MV.i18n = root.i18n
          localStorage && localStorage.setItem(
            '_ohhhoI18n',
            JSON.stringify({
              lang: root.conf.lang,
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
