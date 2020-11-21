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
	  if(root.backend=="lc"){
          import(/* webpackChunkName: "fetch-lc-base" */'./utils/fetch/lc/Base.js').then(({ FetchLCBase }) => {
            FetchLCBase(root)
          })
		  if (root.config.cloudflag) {
          import(/* webpackChunkName: "fetch-lc-CloudFlag" */'./utils/fetch/lc/CloudFlag.js').then(({ FetchLCCloudFlag }) => {
            FetchLCCloudFlag(root)
          })
		  }
	  }
      if (root.mode === 'DesertsP') {
        import(/* webpackChunkName: "body-DesertsP" */'./body/DesertsP.js').then(({ getEle }) => {
          root.ele = getEle(root)
          root.Start()
        })
        import(/* webpackChunkName: "vcard-DesertsP" */'./body/vcard-DesertsP.js').then(({ Vcard }) => {
          root.Vcard = Vcard(root)
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
      if ((typeof root.config.barrager == 'undefined') || (root.config.barrager)) {
        import(/* webpackChunkName: "vcard-barrager" */'./body/vcard-barrager.js').then(({ Vbarrager }) => {
          root.Vbarrager = Vbarrager(root)
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
    if(root.backend=="lc"){root.setAV(root)}
    util.visitor(root)
  } catch (e) {
    return
  }
  try {
    root.loading.hide(root.parentCount)
    root.loading.show()
    root.fetchCount(root)
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
  } catch (e) {}
}
module.exports = MiniValineFactory
