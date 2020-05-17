import { ip, pf } from '../Default'
import getScript from './plugins/getScript'
import GetIP from './plugins/GetIP'
const script = (root) => {
  if (!root.config.NoRecordIP) {
    if (!window.MV.ip) {
      getScript(ip)
      GetIP(root)
    } else {
      root.C.ip = window.MV.ip
    }
  }
  if (!window.MV.pf) {
    getScript(pf)
    window.MV.pf = true
  }
}
module.exports = script
