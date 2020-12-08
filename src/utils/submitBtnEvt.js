import dom from './plugins/dom'
import MakeComment from './plugins/MakeComment'
import check from './plugins/check'
const submitBtnEvt = (root) => {
  const submitBtn = root.el.querySelector('.vsubmit')
  root.submitEvt = (e) => {
    if (submitBtn.getAttribute('disabled-submit')) {
      root.alert.show({
        type: 0,
        text: root.i18n.wait + 'ヾ(๑╹◡╹)ﾉ"',
        ctxt: root.i18n.ok
      })
      return
    }
    if (root.C.comment === '') {
      root.inputs.comment.focus()
      return
    }
    if (root.C.nick === '') {
      root.inputs.nick.focus()
      return
    }
    // render markdown
    const render = (root) => {
      root.C.comment = root.TEXT
      if ((root.backend == 'lc') && (root.C.at !== '')) {
        const at = `<a class="at" href='#${root.C.rid}'>${root.C.at}</a>`
        root.C.comment = at + ' , ' + root.C.comment
      }
      // veirfy
      const mailRet = check.mail(root.C.mail)
      const linkRet = check.link(root.C.link)
      root.C.mail = mailRet.k ? mailRet.v : ''
      root.C.link = linkRet.k ? linkRet.v : ''
      root.C.mailMd5 = md5(root.C.mail)
      if (!mailRet.k || !linkRet.k) {
        root.alert.show({
          type: 0,
          text: root.i18n.inputTips,
          ctxt: root.i18n.confirm
        })
      } else {
        commitEvt()
      }
    }
    MakeComment(root, root, render)
  }
  const commitEvt = () => {
    submitBtn.setAttribute('disabled-submit', true)
    root.submitting.show()
    const callback = (commentItem) => {
      localStorage &&
        localStorage.setItem(
          'MiniValineCache',
          JSON.stringify({
            nick: root.C.nick,
            link: root.C.link,
            mail: root.C.mail
          })
        )
      const _count = root.el.querySelector('.count')
      _count.innerText = Number(_count.innerText) + 1
      if (root.C.rid === '') {
        root.insertComment(commentItem, null, true)
      } else {
        // get children vlist
        const _vlist = root.el.querySelector(`#children-list-${root.C.rid}`)
        root.insertComment(commentItem, _vlist, true)
      }
      submitBtn.removeAttribute('disabled-submit')
      root.submitting.hide()
      root.nodata.hide()
      root.reset()
    }
    root.postComment(root, callback)
  }
  dom.on('click', submitBtn, root.submitEvt)
}
module.exports = submitBtnEvt
