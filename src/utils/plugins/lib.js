import 'lazysizes'
import 'github-markdown-css'
export function lib () {
  window.md5 = require('blueimp-md5')
  if (!window.AV) {
    window.AV = require('leancloud-storage')
  }
  window.autosize = require('autosize')
}
