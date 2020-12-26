import { MaxNL, PS, EUrl, C, avatarUrl, avatarD } from '../Default'
const Config = function (root) {
  root.conf.avatarUrl = root.conf.avatarUrl ? root.conf.avatarUrl.replace(/\/$/g, '') : avatarUrl
  root.conf.avatarD = root.conf.avatarD || avatarD
  root.conf.emoticonUrl = root.conf.emoticonUrl || EUrl
  root.conf.lang = root.conf.lang || navigator.language || navigator.userLanguage
  root.conf.maxNest = root.conf.maxNest || MaxNL
  root.conf.pageSize = root.conf.pageSize || PS
  root.conf.adminEmailMd5 = root.conf.adminEmailMd5 || ''
  root.conf.tagMeta = root.conf.tagMeta || []
  root.conf.master = root.conf.master || []
  root.conf.friends = root.conf.friends || []
  root.conf.mode = root.conf.mode || 'xCss'
  root.conf.placeholder = root.conf.placeholder || ''
  root.C = C
  root.conf.path = root.conf.path || root.conf.pathname || location.pathname
  root.C.url = root.conf.path
  if (root.conf.serverURLs) {
    root.conf.serverURL = root.conf.serverURLs.replace(/\/$/g, '')
  } else if (root.conf.serverURL) {
    root.conf.serverURL = root.conf.serverURL.replace(/\/$/g, '')
  }
  root.conf.role = root.conf.role ? root.conf.role : 'admin'
  root.conf.backend = root.conf.backend ? root.conf.backend : 'lc'
  if (typeof root.conf.md == 'undefined') {
    root.conf.md = true
  }
}
module.exports = Config
