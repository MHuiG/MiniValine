import body from './body'
import util from './utils'

const MiniValineFactory = function (option) {
  const root = this
  root.config = option
  util.initStyle()
  util.Config(root)
  util.script(root)
  util.i18n(root)
  util.smile(root)
  util.GetIP(root)
  root.initCheck()
}
MiniValineFactory.prototype.initCheck = function () {
  const root = this
  var check = setInterval(function () {
    if (typeof root.i18n == 'undefined') { return }
    if (typeof md5 == 'undefined') { return }
    if (typeof AV == 'undefined') { return }
    clearInterval(check)
    root.initBody()
  }, 5)
}
MiniValineFactory.prototype.initBody = function () {
  const root = this
  try {
    body.el(root)
    // loading
    body.loading(root)
    root.nodata.show()
    // load smiles image
    var checksmiles = setInterval(function () {
      if (typeof root.emoticonList == 'undefined') { return }
      clearInterval(checksmiles)
      body.smiles(root)
    }, 10)
    util.setAV(root)
  } catch (ex) {
    console.log(ex)
    return
  }
  root.loading.hide(root.parentCount)
  // alert
  util.alert(root)
  root.loading.show()
  util.initCount(root)
  root.bind()
}
MiniValineFactory.prototype.bind = function () {
  const root = this
  // Smile pictures
  const vsmiles = root.el.querySelector('.vsmile-icons')
  util.dom.on('click', vsmiles, (e) => {
    const textField = root.el.querySelector('.veditor')
    const imgSrc = e.target.src
    if (typeof imgSrc === 'undefined') return
    const tag = `!(:${decodeURI(imgSrc).replace(/^.*\/(.*)$/, '$1')}:)`
    util.insertAtCaret(textField, tag)
    root.Comment.comment = textField.value
    const submitBtn = root.el.querySelector('.vsubmit')
    if (submitBtn.getAttribute('disabled')) {
      submitBtn.removeAttribute('disabled')
    }
  })
  const commentTrigger = root.el.querySelector('.commentTrigger')
  util.dom.on('click', commentTrigger, (e) => {
    commentTrigger.setAttribute('style', 'display:none')
    root.el.querySelector('.auth-section').removeAttribute('style')
    root.el.querySelector('.veditor').focus()
  })
  // cancel reply
  util.dom.on('click', root.el.querySelector('.vcancel-comment-reply'), (e) => {
    root.reset()
  })
  // Query && show comment list
  const expandEvt = (el) => {
    if (el.offsetHeight > 180) {
      el.classList.add('expand')
      util.dom.on('click', el, (e) => {
        el.setAttribute('class', 'vcomment')
      })
    }
  }
  /*
   * 需要权衡: 网络请求数，查询效率，分页问题，Leancloud限制等
   * */
  let num = 1
  root.parentCount = 0
  const parentQuery = (pageNum = 1) => {
    root.loading.show()
    const cq = root.v.Query
      .doCloudQuery(`select nick, comment, link, rid, emailHash, isSpam from Comment where (rid='' or rid is not exists) and (url='${root.Comment.url}' or url='${`${root.Comment.url}/`}') order by -createdAt limit ${(pageNum - 1) * root.pageSize},${root.pageSize}`)
    cq.then((rets) => {
      rets = (rets && rets.results) || []
      const len = rets.length
      if (len) {
        for (let i = 0; i < len; i++) {
          if (rets[i].get('isSpam')) continue
          const render = (o) => {
            rets[i].set('comment', o.TEXT)
            const parentVcard = insertComment(
              rets[i],
              root.el.querySelector('.vlist'),
              false
            )
            parentVcard.setAttribute('style', 'margin-bottom: .5em')
            nestQuery(parentVcard)
          }
          rets[i].TEXT = rets[i].get('comment')
          util.killXSS(rets[i], render)
        }
        const vpage = root.el.querySelector('.vpage')
        vpage.innerHTML =
            root.pageSize * pageNum < root.parentCount
              ? `<div id="vmore" class="more">${root.i18n.more}</div>`
              : ''
        const vmore = vpage.querySelector('#vmore')
        if (vmore) {
          util.dom.on('click', vmore, (e) => {
            vpage.innerHTML = ''
            parentQuery(++num)
          })
        }
      }
      root.loading.hide(root.parentCount)
      util.MathJaxSupport(root)
    }).catch((ex) => {
      console.log(ex)
      root.loading.hide(root.parentCount)
    })
  }
  root.v.Query.doCloudQuery(
      `select count(*) from Comment where (rid='' or rid is not exists) and (url='${root.Comment.url}' or url='${`${root.Comment.url}/`}') order by -createdAt`
  ).then((data) => {
    root.parentCount = data.count
    parentQuery(1)
  }).catch((ex) => {
    console.log(ex)
  })
  // 无限嵌套加载
  const nestQuery = (vcard, level = 1) => {
    const vchild = vcard.querySelector('.vcomment-children')
    const _vlist = vchild.querySelector('.vlist')
    const _id = vcard.getAttribute('id')
    if (level <= 0) {
      vchild.setAttribute('style', 'margin-left: 0 !important')
    }
    if (level >= root.maxNestLevel) {
      root.v.Query.doCloudQuery(
          `select count(*) from Comment where rid='${_id}' and (url='${root.Comment.url}' or url='${`${root.Comment.url}/`}') order by -createdAt`
      ).then(
        (data) => {
          const { count } = data
          if (count > 0) {
            const showChildrenWrapper = vchild.querySelector(
              '.vshow-children-wrapper'
            )
            showChildrenWrapper.setAttribute(
              'style',
              'display: block !important;'
            )
            showChildrenWrapper.innerHTML = `<span class="vshow-children" rid="${_id}">${root.i18n.more}</span>`
            const showChildren = showChildrenWrapper.querySelector(
              '.vshow-children'
            )
            util.dom.on('click', showChildren, (e) => {
              showChildrenWrapper.setAttribute(
                'style',
                'display: none !important;'
              )
              nestQuery(vcard, -1000)
            })
          }
        },
        (error) => {
          console.log(error)
        }
      )
      return
    }
    root.v.Query.doCloudQuery(`select nick, comment, link, rid, emailHash, isSpam from Comment where rid='${_id}' and (url='${root.Comment.url}' or url='${`${root.Comment.url}/`}') order by -createdAt`)
      .then((rets) => {
        rets = (rets && rets.results) || []
        const len = rets.length
        if (len) {
          for (let i = 0; i < len; i++) {
            if (!rets[i].get('isSpam')) {
              const render = (o) => {
                rets[i].set('comment', o.TEXT)
                const vl = insertComment(rets[i], _vlist, true)
                nestQuery(vl, level + 1)
              }
              rets[i].TEXT = rets[i].get('comment')
              util.killXSS(rets[i], render)
            }
          }
        }
      })
      .catch((ex) => {
        console.log(ex)
        root.loading.hide(root.parentCount)
      })
  }
  const insertComment = (comment, vlist = null, top = true) => {
    const _vcard = document.createElement('li')
    _vcard.setAttribute('class', 'vcard')
    _vcard.setAttribute('id', comment.id)
    _vcard.innerHTML = body.vcard(root, comment)
    const _vlist = vlist || root.el.querySelector('.vlist')
    const _vlis = _vlist.querySelectorAll('li')
    const _as = _vcard.querySelectorAll('a')
    for (let i = 0, len = _as.length; i < len; i++) {
      const item = _as[i]
      if (item && item.getAttribute('class') !== 'at') {
        item.setAttribute('target', '_blank')
        item.setAttribute('rel', 'nofollow')
      }
    }
    if (!top) _vlist.appendChild(_vcard)
    else _vlist.insertBefore(_vcard, _vlis[0])
    const _vcontent = _vcard.querySelector('.vcomment')
    expandEvt(_vcontent)
    bindAtEvt(_vcard)
    return _vcard
  }
  const mapping = {
    veditor: 'comment',
    vnick: 'nick',
    vlink: 'link',
    vmail: 'mail'
  }
  const inputs = {}
  for (const i in mapping) {
    if (mapping.hasOwnProperty(i)) {
      const _v = mapping[i]
      const _el = root.el.querySelector(`.${i}`)
      inputs[_v] = _el
      util.dom.on('input', _el, (e) => {
        root.Comment[_v] = _el.value
      })
    }
  }
  // cache
  util.getCache(root)
  // reset form
  root.reset = () => {
    for (const i in mapping) {
      if (mapping.hasOwnProperty(i)) {
        const _v = mapping[i]
        const _el = root.el.querySelector(`.${i}`)
        _el.value = ''
        root.Comment[_v] = ''
      }
    }
    root.Comment.rid = ''
    root.Comment.nick = ''
    util.getCache(root)
    if (smileicons.getAttribute('triggered')) {
      smileicons.setAttribute('style', 'display:none;')
      smileicons.removeAttribute('triggered')
    }
    if (previewText.getAttribute('triggered')) {
      previewText.setAttribute('style', 'display:none;')
      previewText.removeAttribute('triggered')
    }
    root.el
      .querySelector('.vcancel-comment-reply')
      .setAttribute('style', 'display:none')
    root.el
      .querySelector('#vinputs-placeholder')
      .appendChild(root.el.querySelector('.vinputs-wrap'))
  }
  // submit
  const submitBtn = root.el.querySelector('.vsubmit')
  const submitEvt = (e) => {
    if (submitBtn.getAttribute('disabled')) {
      root.alert.show({
        type: 0,
        text: '再等等，评论正在提交中ヾ(๑╹◡╹)ﾉ"',
        ctxt: '好的'
      })
      return
    }
    if (root.Comment.comment === '') {
      inputs.comment.focus()
      return
    }
    if (root.Comment.nick === '') {
      inputs.nick.focus()
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
      const mailRet = util.check.mail(root.Comment.mail)
      const linkRet = util.check.link(root.Comment.link)
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
    util.MakeComment(root, root, render)
  }
  const smileBtn = root.el.querySelector('.vemoji-btn')
  const smileicons = root.el.querySelector('.vsmile-icons')
  util.dom.on('click', smileBtn, (e) => {
    if (previewText.getAttribute('triggered')) {
      previewText.setAttribute('style', 'display:none;')
      previewText.removeAttribute('triggered')
    }
    if (smileicons.getAttribute('triggered')) {
      smileicons.setAttribute('style', 'display:none;')
      smileicons.removeAttribute('triggered')
    } else {
      smileicons.removeAttribute('style')
      smileicons.setAttribute('triggered', 1)
    }
  })
  const previewBtn = root.el.querySelector('.vpreview-btn')
  const previewText = root.el.querySelector('.vpreview-text')
  util.dom.on('click', previewBtn, (e) => {
    if (smileicons.getAttribute('triggered')) {
      smileicons.setAttribute('style', 'display:none;')
      smileicons.removeAttribute('triggered')
    }
    if (previewText.getAttribute('triggered')) {
      previewText.setAttribute('style', 'display:none;')
      previewText.removeAttribute('triggered')
    } else {
      if (root.Comment.comment === '') {
        inputs.comment.focus()
        return
      }
      // render markdown
      const render = (previewText) => {
        previewText.innerHTML = previewText.TEXT
        previewText.removeAttribute('style')
        previewText.setAttribute('triggered', 1)
        util.MathJaxSupport(root)
      }
      util.MakeComment(root)
    }
  })
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
    comment.set(
      'emailHash',
      md5(root.Comment.mail.toLowerCase().trim())
    )
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
          insertComment(commentItem, null, true)
        } else {
          // get children vlist
          const _vlist = root.el.querySelector(
              `#children-list-${root.Comment.rid}`
          )
          insertComment(commentItem, _vlist, true)
        }
        submitBtn.removeAttribute('disabled')
        root.submitting.hide()
        root.nodata.hide()
        root.reset()
        util.MathJaxSupport(root)
      })
      .catch((ex) => {
        root.submitting.hide()
      })
  }
  // at event
  const bindAtEvt = (vcard) => {
    const _id = vcard.getAttribute('id')
    const _vat = vcard.querySelector(`#at-${_id}`)
    util.dom.on('click', _vat, (e) => {
      const at = _vat.getAttribute('at')
      const rid = _vat.getAttribute('rid')
      root.Comment.rid = rid
      root.Comment.at = at
      inputs.comment.value = `${at} , ${inputs.comment.value}`
      // move inputs
      const commentEl = vcard.querySelector(`#comment-${_id}`)
      commentEl.appendChild(root.el.querySelector('.vinputs-wrap'))
      root.el
        .querySelector('.vcancel-comment-reply')
        .removeAttribute('style')
      // remove comment trigger
      root.el
        .querySelector('.commentTrigger')
        .setAttribute('style', 'display:none')
      root.el.querySelector('.auth-section').removeAttribute('style')
      root.el.querySelector('.veditor').focus()
      // focus
      inputs.comment.focus()
    })
  }
  util.dom.on('click', submitBtn, submitEvt)
  util.uploadImage(root)
}
module.exports = MiniValineFactory
