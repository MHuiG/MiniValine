import { ip, polyfill } from '../Default'
import getScript from './plugins/getScript'
import GetIP from './plugins/GetIP'
const script = (root) => {
  if (!root.config.NoRecordIP) {
    getScript(ip)
    GetIP(root)
  }
  getScript(polyfill)
}
module.exports = script
