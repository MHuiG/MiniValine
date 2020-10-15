import body from './body'
import util from './utils'
const MiniValineFactory = function (option) {
  const root = this
  try {
    root.config = option
    if (!document.querySelectorAll(root.config.el)[0]) return
    util.Config(root)
    util.initStyle(root)
    util.ActivateCode(root)
    util.script(root)
    util.i18n(root)
    util.initLibs(root)
  } catch (e) {}
}
MiniValineFactory.prototype.initCheck = function () {
  const root = this
  try {
    var check = setInterval(function () {
      if (!root.i18n) return
      clearInterval(check)
      if (root.mode === 'DesertsP') {
        import(/* webpackChunkName: "body-DesertsP" */'./body/DesertsP.js').then(({ getEle }) => {
          root.ele = getEle(root)
          root.Start()
        })
      } else if (root.mode === 'xCss') {
        if (!root.config.closeUA) {
          import(/* webpackChunkName: "ua" */'./utils/plugins/ua.js').then(({ init }) => {
            init()
          })
        }
        import(/* webpackChunkName: "body-xCss" */'./body/xCss.js').then(({ getEle }) => {
          root.ele = getEle(root)
          root.Start()
        })
      }
    }, 5)
  } catch (e) {}
}
MiniValineFactory.prototype.Start = function () {
  const root = this
  try {
    body.el(root)
    body.loading(root)
    root.nodata.show()
    body.smiles(root)
    util.setAV(root)
    util.visitor(root)
  } catch (e) {
    return
  }
  try {
    util.cloudFlag(root)
    root.loading.hide(root.parentCount)
    root.loading.show()
    util.initCount(root)
    util.insertComment(root, body)
    util.parentQuery(root)
    util.nestQuery(root)
    util.alert(root)
    util.inputs(root)
    util.previewEvt(root)
    util.smileEvt(root)
    if (root.mode === 'DesertsP') {
      util.startEvt(root)
    }
    if ((!root.config.barrager) || (root.config.barrager)) {
      util.barrager(root)
    }
    util.getCache(root)
    util.resetForm(root)
    util.uploadImage(root)
    util.cancelReply(root)
    util.smileBtnEvt(root)
    util.previewBtnEvt(root)
    util.atEvt(root)
    util.submitBtnEvt(root)
    util.smile(root)
  } catch (e) {}
}
module.exports = MiniValineFactory
