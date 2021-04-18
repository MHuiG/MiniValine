import ajax from './plugins/ajax'

const smile = (root) => {
  window.MV.emoticonUrl = root.conf.emoticonUrl
  if (!window.MV.emoticonList) {
    let s = localStorage && localStorage.getItem('_ohhhoSmile')
    if (s) {
      s = JSON.parse(s)
      if (equar(s.emoticonUrl, root.conf.emoticonUrl)) {
        root.emoticonList = s.emoticonList
        root.emoticon = []
        for (let i = 0; i < root.emoticonList.length; i++) {
          for (let j = 0; j < root.emoticonList[i].length; j++) {
            root.emoticon[root.emoticonList[i][j].split('/')[root.emoticonList[i][j].split('/').length - 1]] = root.emoticonList[i][j]
          }
        }
        window.MV.emoticonList = root.emoticonList
        window.MV.emoticon = root.emoticon
        window.MV.getSmile = 0
      } else {
        window.MV.getSmile = 1
      }
    } else {
      window.MV.getSmile = 1
    }
    if (window.MV.getSmile) {
      root.emoticonList = []
      root.emoticon = []
      for (let k = 0; k < root.conf.emoticonUrl.length; k++) {
        getSmile(root, root.conf.emoticonUrl[k])
      }
      window.MV.emoticonList = root.emoticonList
      window.MV.emoticon = root.emoticon
    } else {
      root.emoticonList = window.MV.emoticonList
      root.emoticon = window.MV.emoticon
    }
    setTimeout(function () {
      if ((typeof root.emoticonList != 'undefined') && (root.emoticonList.length != 0)) {
        localStorage && localStorage.setItem(
          '_ohhhoSmile',
          JSON.stringify({
            emoticonUrl: window.MV.emoticonUrl,
            emoticonList: window.MV.emoticonList
          })

        )
      }
    }, 5000)
  }
}
const getSmile = (root, Url) => {
  ajax({
    url: Url.replace(/\/$/g, '') + '/index.json',
    type: 'GET',
    success: function (data) {
      const tmp = []
      for (let i = 0; i < data[0].length; i++) {
        tmp.push(Url + '/' + data[0][i])
        root.emoticon[data[0][i]] = Url + '/' + data[0][i]
      }
      root.emoticonList.push(tmp)
    }
  })
}
function equar (a, b) {
  if (a.length !== b.length) {
    return false
  } else {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false
      }
    }
    return true
  }
}
module.exports = smile
