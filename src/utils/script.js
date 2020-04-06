import { ip } from '../Default'
import getScript from './plugins/getScript'
const script = (root) => {
  getScript(ip)
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    root.config.md = false
    getScript('https://cdn.polyfill.io/v2/polyfill.min.js?features=es6')
  }
}
module.exports = script
