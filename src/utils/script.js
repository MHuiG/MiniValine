import { ip, pf } from '../Default'
import getScript from './plugins/getScript'
import GetIP from './plugins/GetIP'
const script = (root) => {
  if (!root.config.NoRecordIP) {
    getScript(ip)
    GetIP(root)
  }
  getScript(pf)
}
module.exports = script
