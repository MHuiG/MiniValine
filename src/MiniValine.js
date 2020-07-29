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
  util.initLibs(root)
}
MiniValineFactory.prototype.initCheck = function () {
  const root = this
  var check = setInterval(function () {
    if (typeof root.i18n == 'undefined') return
    clearInterval(check)
    if (root.mode === 'DesertsP') {
      import(/* webpackChunkName: "body-DesertsP" */'./body/DesertsP.js').then(({ getEle }) => {
        root.ele = getEle(root)
        root.initBody()
      })
    } else if (root.mode === 'xCss') {
      if (!root.config.closeUA) {
        import(/* webpackChunkName: "ua" */'./utils/plugins/ua.js').then(({ init }) => {
          init()
        })
      }
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
    // console.log(ex)
    return
  }
  util.cloudFlag(root)
  root.loading.hide(root.parentCount)
  root.loading.show()
  util.initCount(root)
  root.bind()
}
MiniValineFactory.prototype.bind = function () {
  const root = this
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
  if ((typeof root.config.barrager == 'undefined') || (root.config.barrager)) {
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
  util.visitor(root)
}
module.exports = MiniValineFactory
