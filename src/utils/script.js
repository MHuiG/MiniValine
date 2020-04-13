import { ip, polyfill } from '../Default'
import getScript from './plugins/getScript'
const script = (root) => {
  getScript(ip)
  getScript(polyfill)
}
module.exports = script
