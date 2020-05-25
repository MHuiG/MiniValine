import { vis, pf } from '../Default'
import getScript from './plugins/getScript'
import GetIP from './plugins/GetIP'
const script = (root) => {
  if (!root.config.NoRecordIP) {
    if (!window.MV.ip) {
      GetIP(root)
    } else {
      root.C.ip = window.MV.ip
    }
  }
  if (!window.MV.pf) {
    getScript(pf)
    window.MV.pf = true
  }
  if (!window.MV.vis) {
    getScript(vis)
    window.MV.vis = true
  }
}
module.exports = script
