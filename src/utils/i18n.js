import { i18nUrl } from '../Default'
import ajax from './ajax'

const i18n = (root) => {
  ajax({
    url: i18nUrl + root.lang + '/index.json',
    type: 'GET',
    success: function (data) {
      data = eval('(' + data + ')')
      root.i18n = data
    }
  })
}
module.exports = i18n
