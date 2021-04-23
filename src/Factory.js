import 'lazysizes'
import body from './body'
import util from './utils'
import FetchBase from './utils/fetch/Base.js'
import WS from './utils/fetch/ws'
window.autosize = require('autosize')
const Factory = function (option) {
  const root = this
  try {
    root.conf = option
    if (!document.querySelectorAll(root.conf.el)[0]) return
    util.Config(root)
    WS(root)
    util.i18n(root)
    root.initCheck()
  } catch (e) { console.error(e) }
}
Factory.prototype.initCheck = function () {
  const root = this
  try {
    const check = setInterval(function () {
      if (!root.i18n) return
      clearInterval(check)
      FetchBase(root)
      root.ele = body.getEle(root)
      root.Start()
    }, 5)
  } catch (e) { console.error(e) }
}
Factory.prototype.Start = function () {
  const root = this
  try {
    body.el(root)
    body.loading(root)
    root.nodata.show()
    body.smiles(root)
  } catch (e) {
    console.error(e)
    return
  }
  try {
    root.loading.hide(root.parentCount)
    root.loading.show()

    util.insertComment(root, body)
    util.parentQuery(root)
    util.nestQuery(root)

    util.alert(root)
    util.inputs(root)
    util.previewEvt(root)
    util.smileEvt(root)

    util.getCache(root)
    util.resetForm(root)
    util.uploadImage(root)
    util.cancelReply(root)
    util.smileBtnEvt(root)
    util.previewBtnEvt(root)
    util.atEvt(root)
    util.submitBtnEvt(root)
    util.smile(root)
    window.MV.root = root
    window.MV.util = util
    typeof root.conf.FinishLoaded === 'function' && root.conf.FinishLoaded()
  } catch (e) { console.error(e) }
}
module.exports = Factory
