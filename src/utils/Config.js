import { MaxNL, PS, EUrl, C } from '../Default'
const Config = function (root) {
  root.emoticonUrl = root.config.emoticonUrl || EUrl
  root.lang = root.config.lang || navigator.language || navigator.userLanguage
  root.maxNestLevel = root.config.maxNest || MaxNL
  root.pageSize = root.config.pageSize || PS
  root.adminEmailMd5 = root.config.adminEmailMd5 || ''
  root.tagMeta = root.config.tagMeta || []
  root.master = root.config.master || []
  root.friends = root.config.friends || []
  root.mode = root.config.mode || 'xCss'
  root.placeholder = root.config.placeholder || ''
  root.C = C
  root.path = root.config.path || root.config.pathname || location.pathname
  root.C.url = root.path
  root.serverURL = root.config.serverURLs ? root.config.serverURLs.replace(/\/$/g, '') : ''
  root.role = root.config.role ? root.config.role : 'admin'
  root.backend = root.config.backend ? root.config.backend : 'lc'
}
module.exports = Config
