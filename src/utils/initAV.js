import { AVSdkUrl } from '../const'
import Utils from './domUtils'

const initAV = function (root) {
  if (typeof AV === 'undefined') {
    Utils.dynamicLoadSource('script', { src: AVSdkUrl }, () => {
      if (typeof AV === 'undefined') {
        setTimeout(initAV(root), 300)
      } else !!root.config && root.initMiniValine()
    })
  } else !!root.config && root.initMiniValine()
}

module.exports = initAV
