import body from './body'
import util from './utils'
const MiniValineFactory = function (option) {
  const root = this
  root.config = option
  util.Config(root)
  util.initStyle(root)
  util.ActivateCode(root)
  util.script(root)
  util.i18n(root)
  util.smile(root)
  util.initLibs(root)
}
MiniValineFactory.prototype.initCheck = function () {
  const root = this
  var check = setInterval(function () {
    if (typeof root.i18n == 'undefined') { return }
    clearInterval(check)
    if (root.mode === 'DesertsP') {
      import(/* webpackChunkName: "body-DesertsP" */'./body/DesertsP.js').then(({ getEle }) => {
        root.ele = getEle(root)
        root.initBody()
      })
    } else if (root.mode === 'xCss') {
      import(/* webpackChunkName: "body-xCss" */'./body/xCss.js').then(({ getEle }) => {
        root.ele = getEle(root)
        root.initBody()
      })
    }
  }, 5)
}
MiniValineFactory.prototype.initBody = function () {
  const root = this
  try {
    body.el(root)
    body.loading(root)
    root.nodata.show()
    body.smiles(root)
    util.setAV(root)
  } catch (ex) {
    console.log(ex)
    return
  }
  root.loading.hide(root.parentCount)
  util.alert(root)
  root.loading.show()
  util.initCount(root)
  root.bind()
}
MiniValineFactory.prototype.bind = function () {
  const root = this
  util.inputs(root)
  util.previewEvt(root)
  util.smileEvt(root)
  util.startEvt(root)
  util.getCache(root)
  util.resetForm(root)
  util.uploadImage(root)
  util.cancelReply(root)
  util.smileBtnEvt(root)
  util.previewBtnEvt(root)
  util.atEvt(root)
  util.submitBtnEvt(root)
  util.insertComment(root, body)
  util.parentQuery(root)
  util.nestQuery(root)
}
module.exports = MiniValineFactory
