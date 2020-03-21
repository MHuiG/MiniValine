import { MaxNestLevel, PageSize, EmoticonList, EmoticonUrl, store, defaultComment,GravatarBaseUrl } from '../const'
import i18n from '../i18n'
const initConfig = function (root) {
  root.emoticonUrl = root.config.emoticonUrl || EmoticonUrl
  root.emoticonList = root.config.emoticonList || EmoticonList
  root.i18n = i18n(root.config.lang || navigator.language || navigator.userLanguage)
  root.maxNestLevel = root.config.maxNest || MaxNestLevel
  root.pageSize = root.config.pageSize || PageSize
  root.adminEmailMd5 = root.config.adminEmailMd5 || ''
  root.math = root.config.math || false
  root.placeholder = root.config.placeholder || ''
  defaultComment.url = root.config.pathname || location.pathname.replace(/\/$/, '')
}

module.exports = initConfig