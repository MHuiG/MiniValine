import 'lazysizes'
export function lib (root) {
  window.md5 = require('blueimp-md5')
  window.autosize = require('autosize')
  if (root.conf.closeMarkdownStyle) return
  if (!root.conf.md) return
  require('github-markdown-css')
}
