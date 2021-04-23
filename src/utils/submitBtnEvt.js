import dom from './plugins/dom'
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
    // render comment
    const ls = root.C.comment.match(/!\(:(.*?\.\w+):\)/g)
    if (ls) {
      for (let i = 0; i < ls.length; i++) {
        const m = ls[i].match(/!\(:(.*?\.\w+):\)/)[1]
        const em = root.emoticon[m]
        const R = new RegExp('!\\(:' + m.replace(/\./, '\\.') + ':\\)', 'g')
        root.C.comment = root.C.comment.replace(R, `![${m}](${em})`)
      }
    }
    // veirfy
    const mailRet = check.mail(root.C.mail)
    const linkRet = check.link(root.C.link)
    root.C.mail = mailRet.k ? mailRet.v : ''
    root.C.link = linkRet.k ? linkRet.v : ''
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
  const commitEvt = () => {
    submitBtn.setAttribute('disabled-submit', true)
    root.submitting.show()
    const callback = (commentItem) => {
      localStorage &&
        localStorage.setItem(
          '_ohhho',
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
