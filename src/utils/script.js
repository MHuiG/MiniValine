import { ip } from '../Default'
import getScript from './plugins/getScript'
const script = (root) => {
  getScript(ip)
  getScript('https://cdn.polyfill.io/v3/polyfill.min.js?features=es6')
}
module.exports = script
