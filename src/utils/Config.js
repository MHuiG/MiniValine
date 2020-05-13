import { MaxNL, PS, EUrl, C } from '../Default'
const Config = function (root) {
  root.emoticonUrl = root.config.emoticonUrl || EUrl
  root.lang = root.config.lang || navigator.language || navigator.userLanguage
  root.maxNestLevel = root.config.maxNest || MaxNL
  root.pageSize = root.config.pageSize || PS
  root.adminEmailMd5 = root.config.adminEmailMd5 || ''
  root.math = root.config.math
  root.md = root.config.md
  root.mode = root.config.mode || 'DesertsP'
  root.placeholder = root.config.placeholder || ''
  root.C = C
  root.C.url = root.config.pathname || location.pathname.replace(/\/$/, '')
}
module.exports = Config
