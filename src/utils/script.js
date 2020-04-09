import { ip } from '../Default'
import getScript from './plugins/getScript'
const script = (root) => {
  getScript(ip)
  getScript('https://cdn.polyfill.io/v3/polyfill.min.js?features=es6')
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    root.config.md = false
  }
}
module.exports = script
