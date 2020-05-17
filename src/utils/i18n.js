import { i18nUrl } from '../Default'
import ajax from './plugins/ajax'

const i18n = (root) => {
  if (!window.MV.i18n) {
    ajax({
      url: i18nUrl + root.lang + '/index.json',
      type: 'GET',
      success: function (data) {
        data = eval('(' + data + ')')
        root.i18n = data
        window.MV.i18n = root.i18n
      }
    })
  } else {
    root.i18n = window.MV.i18n
  }
}
module.exports = i18n
