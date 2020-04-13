import { EmoticonUrl } from '../Default'
import ajax from './plugins/ajax'

const smile = (root) => {
  ajax({
    url: EmoticonUrl + '/index.json',
    type: 'GET',
    success: function (data) {
      data = eval('(' + data + ')')
      root.emoticonList = data[0]
    }
  })
}
module.exports = smile
