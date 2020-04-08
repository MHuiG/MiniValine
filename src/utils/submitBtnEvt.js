import dom from './plugins/dom'
import MakeComment from './plugins/MakeComment'
import check from './plugins/check'
const submitBtnEvt = (root) => {
  const submitBtn = root.el.querySelector('.vsubmit')
  root.submitEvt = (e) => {
    if (submitBtn.getAttribute('disabled')) {
      root.alert.show({
        type: 0,
        text: root.i18n.wait + 'ヾ(๑╹◡╹)ﾉ"',
        ctxt: root.i18n.ok
      })
      return
    }
    if (root.Comment.comment === '') {
      root.inputs.comment.focus()
      return
    }
    if (root.Comment.nick === '') {
      root.inputs.nick.focus()
      return
    }
    // render markdown
    const render = (root) => {
      root.Comment.comment = root.TEXT
      const idx = root.Comment.comment.indexOf(root.Comment.at)
      if (idx > -1 && root.Comment.at !== '') {
        const at = `<a class="at" href='#${root.Comment.rid}'>${root.Comment.at}</a>`
        root.Comment.comment = root.Comment.comment.replace(root.Comment.at, at)
      }
      // veirfy
      const mailRet = check.mail(root.Comment.mail)
      const linkRet = check.link(root.Comment.link)
      root.Comment.mail = mailRet.k ? mailRet.v : ''
      root.Comment.link = linkRet.k ? linkRet.v : ''
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
  // setting access
  const getAcl = () => {
    const acl = new root.v.ACL()
    acl.setPublicReadAccess(true)
    acl.setPublicWriteAccess(false)
    return acl
  }
  const commitEvt = () => {
    submitBtn.setAttribute('disabled', true)
    root.submitting.show()
    // 声明类型
    const Ct = root.v.Object.extend('Comment')
    // 新建对象
    const comment = new Ct()
    for (const i in root.Comment) {
      if (root.Comment.hasOwnProperty(i)) {
        if (i === 'at') continue
        const _v = root.Comment[i]
        comment.set(i, _v)
      }
    }
    comment.set('emailHash', md5(root.Comment.mail.toLowerCase().trim()))
    comment.setACL(getAcl())
    comment
      .save()
      .then((commentItem) => {
        localStorage &&
            localStorage.setItem(
              'MiniValineCache',
              JSON.stringify({
                nick: root.Comment.nick,
                link: root.Comment.link,
                mail: root.Comment.mail
              })
            )
        const _count = root.el.querySelector('.count')
        _count.innerText = Number(_count.innerText) + 1
        if (root.Comment.rid === '') {
          root.insertComment(commentItem, null, true)
        } else {
          // get children vlist
          const _vlist = root.el.querySelector(`#children-list-${root.Comment.rid}`)
          root.insertComment(commentItem, _vlist, true)
        }
        submitBtn.removeAttribute('disabled')
        root.submitting.hide()
        root.nodata.hide()
        root.reset()
      })
      .catch((ex) => {
        root.submitting.hide()
      })
  }
  dom.on('click', submitBtn, root.submitEvt)
}
module.exports = submitBtnEvt
