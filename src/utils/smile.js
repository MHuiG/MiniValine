import ajax from './plugins/ajax'

const smile = (root) => {
  root.emoticonList = []
  root.emoticon = []
  for (var i = 0; i < root.emoticonUrl.length; i++) {
    getSmile(root, root.emoticonUrl[i])
  }
}
const getSmile = (root, Url) => {
  ajax({
    url: Url + '/index.json',
    type: 'GET',
    success: function (data) {
      data = eval('(' + data + ')')
      for (var i = 0; i < data[0].length; i++) {
        root.emoticonList.push(Url + '/' + data[0][i])
        root.emoticon[data[0][i]] = Url + '/' + data[0][i]
      }
    }
  })
}
module.exports = smile
