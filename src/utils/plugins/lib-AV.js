export function lib () {
  if (!window.AV) {
    window.AV = require('leancloud-storage')
  }
}
