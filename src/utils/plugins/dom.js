const utils = {
  on (type, el, handler, capture) {
    type = type.split(' ')
    for (let i = 0, len = type.length; i < len; i++) {
      utils.off(type[i], el, handler, capture)
      if (el.addEventListener) el.addEventListener(type[i], handler, capture || false)
      else if (el.attachEvent) el.attachEvent(`on${type[i]}`, handler)
      else el[`on${type[i]}`] = handler
    }
  },
  off (type, el, handler, capture) {
    type = type.split(' ')
    for (let i = 0, len = type.length; i < len; i++) {
      if (el.removeEventListener) el.removeEventListener(type, handler, capture || false)
      else if (el.detachEvent) el.detachEvent(`on${type}`, handler)
      else el[`on${type}`] = null
    }
  }
}
window.MV.dom = utils
module.exports = utils
