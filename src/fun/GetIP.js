import Utils from '../utils/domUtils'
import { defaultComment } from '../const'
const GetIP = () => {
  Utils.create('script', 'src', 'https://api.ip.sb/jsonip?callback=getIP')
  const s = document.getElementsByTagName('script')[0]
  document.head.append(s)
  window.getIP = json => {
    defaultComment.ip = json.ip
  }
}

module.exports = GetIP
