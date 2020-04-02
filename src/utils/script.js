import { AVSdkUrl, MD5, lazysizes, ip } from '../Default'
const script = (root) => {
  getScript(AVSdkUrl)
  getScript(MD5)
  getScript(lazysizes)
  getScript(ip)
}
const getScript = (src) => {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = src
  document.getElementsByTagName('head')[0].appendChild(script)
}
module.exports = script
