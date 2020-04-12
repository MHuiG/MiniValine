import { MaxNestLevel, PageSize, EmoticonUrl, Comment } from '../Default'
const Config = function (root) {
  root.emoticonUrl = root.config.emoticonUrl || EmoticonUrl
  root.lang = root.config.lang || navigator.language || navigator.userLanguage
  root.maxNestLevel = root.config.maxNest || MaxNestLevel
  root.pageSize = root.config.pageSize || PageSize
  root.adminEmailMd5 = root.config.adminEmailMd5 || ''
  root.math = root.config.math
  root.md = root.config.md
  root.placeholder = root.config.placeholder || ''
  root.Comment = Comment
  root.Comment.url = root.config.pathname || location.pathname.replace(/\/$/, '')
}
module.exports = Config
