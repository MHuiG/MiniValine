import { MaxNL, PS, EUrl, C, avatarUrl, avatarD } from '../Default'
const Config = function (root) {
  root.conf.avatarUrl = root.conf.avatarUrl ? root.conf.avatarUrl.replace(/\/$/g, '') : avatarUrl
  root.conf.avatarD = root.conf.avatarD || avatarD
  root.conf.emoticonUrl = root.conf.emoticonUrl || EUrl
  root.conf.lang = root.conf.lang || navigator.language || navigator.userLanguage
  root.conf.maxNest = root.conf.maxNest || MaxNL
  root.conf.pageSize = root.conf.pageSize || PS
  root.conf.placeholder = root.conf.placeholder || ''
  root.C = C
  root.conf.path = root.conf.path || root.conf.pathname || location.pathname
  root.C.url = root.conf.path
  root.conf.serverURL = root.conf.serverURL.replace(/\/$/g, '')
  root.conf.uploadImageURL = root.conf.uploadImageURL || 'https://pic.alexhchu.com/api/upload'
  root.conf.uploadImageParse = root.conf.uploadImageParse || ((res) => {
    return res.data.url
  })
}
module.exports = Config
