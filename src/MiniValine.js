import 'lazysizes'
import xss from 'xss'
import crypto from 'blueimp-md5'
import utils from './utils'
import html from './html'
import { store, defaultComment, GravatarBaseUrl } from './const'

const MiniValineFactory = function (option) {
  const root = this
  root.config = option
  root.init()
}

MiniValineFactory.prototype.init = function () {
  const root = this
  utils.GetIP()
  utils.initAV(root)
}

MiniValineFactory.prototype.initMiniValine = function () {
  const root = this
  try {
    utils.initConfig(root)
    html.el(root)
    // loading
    html.loading(root)

    root.nodata.show()

    // load smiles image
    html.smiles(root)

    utils.setAV(root)
  } catch (ex) {
    console.log(ex)
    return
  }

  root.loading.hide()

  const mark = root.el.querySelector('.vmark')
  // alert
  root.alert = {
    /**
       * {
       *  type:0/1,
       *  text:'',
       *  ctxt:'',
       *  otxt:'',
       *  cb:fn
       * }
       *
       * @param {Object} o
       */
    show (o) {
      mark.innerHTML = `<div class="valert txt-center"><div class="vtext">${o.text}</div><div class="vbtns"></div></div>`
      const vbtns = mark.querySelector('.vbtns')
      const cBtn = `<button class="vcancel vbtn">${(o && o.ctxt) || root.i18n.cancel}</button>`
      const oBtn = `<button class="vsure vbtn">${(o && o.otxt) || root.i18n.t('continue')}</button>`
      vbtns.innerHTML = `${cBtn}${o.type && oBtn}`
      mark.querySelector('.vcancel').addEventListener('click', (e) => {
        root.alert.hide()
      })
      mark.setAttribute('style', 'display:block;')
      if (o && o.type) {
        const ok = mark.querySelector('.vsure')
        utils.domUtils.on('click', ok, (e) => {
          root.alert.hide()
          o.cb && o.cb()
        })
      }
    },
    hide () {
      mark.setAttribute('style', 'display:none;')
    }
  }

  root.loading.show()
  const query1 = new root.v.Query('Comment')
  query1.equalTo('url', defaultComment.url)
  const query2 = new root.v.Query('Comment')
  query2.equalTo('url', `${defaultComment.url}/`)
  const query = AV.Query.or(query1, query2)
  query.notEqualTo('isSpam', true)
  query
    .count()
    .then(count => {
      root.el.querySelector('.count').innerHTML = count
    })
    .catch(ex => {
      console.log(ex)
      root.el.querySelector('.count').innerHTML = 0
    })
  root.bind()
}

MiniValineFactory.prototype.bind = function () {
  const root = this
  // Smile pictures
  const vsmiles = root.el.querySelector('.vsmile-icons')
  utils.domUtils.on('click', vsmiles, e => {
    const textField = root.el.querySelector('.veditor')
    const imgSrc = e.target.src
    if (typeof imgSrc === 'undefined') return
    const tag = `!(:${decodeURI(imgSrc).replace(/^.*\/(.*)$/, '$1')}:)`
    if (document.selection) {
      textField.focus()
      var sel = document.selection.createRange()
      sel.text = tag
      textField.focus()
    } else if (textField.selectionStart || textField.selectionStart === '0') {
      const startPos = textField.selectionStart
      const endPos = textField.selectionEnd
      let cursorPos = endPos
      textField.value =
          textField.value.substring(0, startPos) +
          tag +
          textField.value.substring(endPos, textField.value.length)
      cursorPos += tag.length
      textField.focus()
      textField.selectionStart = cursorPos
      textField.selectionEnd = cursorPos
    } else {
      textField.value += tag
      textField.focus()
    }
    defaultComment.comment = textField.value
    const submitBtn = root.el.querySelector('.vsubmit')
    if (submitBtn.getAttribute('disabled')) {
      submitBtn.removeAttribute('disabled')
    }
  })
  const commentTrigger = root.el.querySelector('.commentTrigger')
  utils.domUtils.on('click', commentTrigger, e => {
    commentTrigger.setAttribute('style', 'display:none')
    root.el.querySelector('.auth-section').removeAttribute('style')
    root.el.querySelector('.veditor').focus()
  })

  // cancel reply
  utils.domUtils.on('click', root.el.querySelector('.vcancel-comment-reply'), e => {
    root.reset()
  })

  // Query && show comment list

  const expandEvt = el => {
    if (el.offsetHeight > 180) {
      el.classList.add('expand')
      utils.domUtils.on('click', el, e => {
        el.setAttribute('class', 'vcomment')
      })
    }
  }

  /*
     * 需要权衡: 网络请求数，查询效率，分页问题，Leancloud限制等
     * */

  let num = 1
  let parentCount = 0

  const parentQuery = (pageNum = 1) => {
    root.loading.show()
    const cq = root.v.Query
      .doCloudQuery(`select nick, comment, link, rid, emailHash, isSpam from Comment where (rid='' or rid is not exists) and (url='${defaultComment.url}' or url='${`${defaultComment.url}/`}') order by -createdAt limit ${(pageNum - 1) * root.pageSize},${root.pageSize}`)
    cq.then(rets => {
      rets = (rets && rets.results) || []
      const len = rets.length
      if (len) {
        // root.el.querySelector('.vlist').innerHTML = '';
        for (let i = 0; i < len; i++) {
          if (rets[i].get('isSpam')) continue
          const parentVcard = insertComment(
            rets[i],
            root.el.querySelector('.vlist'),
            false
          )
          parentVcard.setAttribute('style', 'margin-bottom: .5em')
          nestQuery(parentVcard)
        }
        const vpage = root.el.querySelector('.vpage')
        vpage.innerHTML =
            root.pageSize * pageNum < parentCount
              ? `<div id="vmore" class="more">${root.i18n.t('more')}</div>`
              : ''
        const vmore = vpage.querySelector('#vmore')
        if (vmore) {
          utils.domUtils.on('click', vmore, e => {
            vpage.innerHTML = ''
            parentQuery(++num)
          })
        }
      }
      root.loading.hide()
      utils.MathJaxSupport(root.math)
    }).catch(ex => {
      console.log(ex)
      root.loading.hide()
    })
  }
  root.v.Query.doCloudQuery(
      `select count(*) from Comment where (rid='' or rid is not exists) and (url='${defaultComment.url}' or url='${`${defaultComment.url}/`}') order by -createdAt`
  ).then(data => {
    parentCount = data.count
    parentQuery(1)
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
          `select count(*) from Comment where rid='${_id}' and (url='${defaultComment.url}' or url='${`${defaultComment.url}/`}') order by -createdAt`
      ).then(
        data => {
          const { count } = data
          if (count > 0) {
            const showChildrenWrapper = vchild.querySelector(
              '.vshow-children-wrapper'
            )
            showChildrenWrapper.setAttribute(
              'style',
              'display: block !important;'
            )
            showChildrenWrapper.innerHTML = `<span class="vshow-children" rid="${_id}">${root.i18n.t('more')}</span>`
            const showChildren = showChildrenWrapper.querySelector(
              '.vshow-children'
            )
            utils.domUtils.on('click', showChildren, e => {
              showChildrenWrapper.setAttribute(
                'style',
                'display: none !important;'
              )
              nestQuery(vcard, -1000)
            })
          }
        },
        error => {
          console.log(error)
        }
      )
      return
    }

    root.v.Query.doCloudQuery(`select nick, comment, link, rid, emailHash, isSpam from Comment where rid='${_id}' and (url='${defaultComment.url}' or url='${`${defaultComment.url}/`}') order by -createdAt`)
      .then(rets => {
        rets = (rets && rets.results) || []
        const len = rets.length
        if (len) {
          for (let i = 0; i < len; i++) {
            if (!rets[i].get('isSpam')) {
              const vl = insertComment(rets[i], _vlist, true)
              nestQuery(vl, level + 1)
            }
          }
        }
      })
      .catch(ex => {
        console.log(ex)
        root.loading.hide()
      })
  }

  const insertComment = (comment, vlist = null, top = true) => {
    const _vcard = document.createElement('li')
    _vcard.setAttribute('class', 'vcard')
    _vcard.setAttribute('id', comment.id)
    _vcard.innerHTML = html.vcard(root, comment)

    const _vlist = vlist || root.el.querySelector('.vlist')
    const _vlis = _vlist.querySelectorAll('li')
    // let _vat = _vcard.querySelector('.vat');
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
      utils.domUtils.on('input', _el, e => {
        // defaultComment[_v] = HtmlUtil.encode(_el.value.replace(/(^\s*)|(\s*$)/g, ""));
        defaultComment[_v] = _el.value
      })
    }
  }

  // cache
  const getCache = () => {
    let s = store && store.getItem('MiniValineCache')
    if (s) {
      s = JSON.parse(s)
      const m = ['nick', 'link', 'mail']
      for (const i in m) {
        const k = m[i]
        root.el.querySelector(`.v${k}`).value = s[k]
        defaultComment[k] = s[k]
      }
      if (s.mail !== '') {
        const el = root.el.querySelector('.visitor_avatar')
        el.setAttribute(
          'src',
            `${GravatarBaseUrl + crypto(s.mail.toLowerCase().trim())}?size=80&d=https%3a%2f%2fgravatar.loli.net%2favatar%2f9e63c80900d106cbbec5a9f4ea433a3e.jpg%3fsize%3d80`
        )
      }
    }
  }
  getCache()

  // reset form
  root.reset = () => {
    for (const i in mapping) {
      if (mapping.hasOwnProperty(i)) {
        const _v = mapping[i]
        const _el = root.el.querySelector(`.${i}`)
        _el.value = ''
        defaultComment[_v] = ''
      }
    }
    defaultComment.rid = ''
    defaultComment.nick = ''
    getCache()
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
  const submitEvt = e => {
    if (submitBtn.getAttribute('disabled')) {
      root.alert.show({
        type: 0,
        text: '再等等，评论正在提交中ヾ(๑╹◡╹)ﾉ"',
        ctxt: '好的'
      })
      return
    }
    if (defaultComment.comment == '') {
      inputs.comment.focus()
      return
    }
    if (defaultComment.nick == '') {
      inputs.nick.focus()
      return
    }
    // render markdown
    defaultComment.comment = xss(
      utils.md(
        defaultComment.comment.replace(
          /!\(:(.*?\.\w+):\)/g,
            `<img src="${root.emoticonUrl}/$1" alt="$1" class="vemoticon-img">`
        )
      ),
      {
        onIgnoreTagAttr (tag, name, value, isWhiteAttr) {
          if (name === 'class') {
            return `${name}="${xss.escapeAttrValue(value)}"`
          }
        }
      }
    )
    const idx = defaultComment.comment.indexOf(defaultComment.at)
    if (idx > -1 && defaultComment.at != '') {
      const at = `<a class="at" href='#${defaultComment.rid}'>${defaultComment.at}</a>`
      defaultComment.comment = defaultComment.comment.replace(
        defaultComment.at,
        at
      )
    }
    // veirfy
    const mailRet = utils.check.mail(defaultComment.mail)
    const linkRet = utils.check.link(defaultComment.link)
    defaultComment.mail = mailRet.k ? mailRet.v : ''
    defaultComment.link = linkRet.k ? linkRet.v : ''

    if (!mailRet.k || !linkRet.k) {
      root.alert.show({
        type: 0,
        text: root.i18n.t('inputTips'),
        ctxt: root.i18n.t('confirm')
      })
    } else {
      commitEvt()
    }
  }

  const smileBtn = root.el.querySelector('.vemoji-btn')
  const smileicons = root.el.querySelector('.vsmile-icons')
  utils.domUtils.on('click', smileBtn, e => {
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
  utils.domUtils.on('click', previewBtn, e => {
    if (smileicons.getAttribute('triggered')) {
      smileicons.setAttribute('style', 'display:none;')
      smileicons.removeAttribute('triggered')
    }
    if (previewText.getAttribute('triggered')) {
      previewText.setAttribute('style', 'display:none;')
      previewText.removeAttribute('triggered')
    } else {
      if (defaultComment.comment == '') {
        inputs.comment.focus()
        return
      }
      // render markdown
      previewText.innerHTML = xss(
        utils.md(
          defaultComment.comment.replace(
            /!\(:(.*?\.\w+):\)/g,
              `<img src="${root.emoticonUrl}/$1" alt="$1" class="vemoticon-img">`
          )
        ),
        {
          onIgnoreTagAttr (tag, name, value, isWhiteAttr) {
            if (name === 'class') {
              return `${name}="${xss.escapeAttrValue(value)}"`
            }
          }
        }
      )
      previewText.removeAttribute('style')
      previewText.setAttribute('triggered', 1)
    }
    utils.MathJaxSupport(root.math)
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
    for (const i in defaultComment) {
      if (defaultComment.hasOwnProperty(i)) {
        if (i === 'at') continue
        const _v = defaultComment[i]
        comment.set(i, _v)
      }
    }
    comment.set(
      'emailHash',
      crypto(defaultComment.mail.toLowerCase().trim())
    )
    comment.setACL(getAcl())
    comment
      .save()
      .then(commentItem => {
        store &&
            store.setItem(
              'MiniValineCache',
              JSON.stringify({
                nick: defaultComment.nick,
                link: defaultComment.link,
                mail: defaultComment.mail
              })
            )
        const _count = root.el.querySelector('.count')
        _count.innerText = Number(_count.innerText) + 1
        if (defaultComment.rid === '') {
          insertComment(commentItem, null, true)
        } else {
          // get children vlist
          const _vlist = root.el.querySelector(
              `#children-list-${defaultComment.rid}`
          )
          insertComment(commentItem, _vlist, true)
        }

        submitBtn.removeAttribute('disabled')
        root.submitting.hide()
        root.nodata.hide()
        root.reset()
        utils.MathJaxSupport(root.math)
      })
      .catch(ex => {
        root.submitting.hide()
      })
  }

  // at event
  const bindAtEvt = vcard => {
    const _id = vcard.getAttribute('id')
    const _vat = vcard.querySelector(`#at-${_id}`)
    utils.domUtils.on('click', _vat, e => {
      const at = _vat.getAttribute('at')
      const rid = _vat.getAttribute('rid')
      defaultComment.rid = rid
      defaultComment.at = at
      inputs.comment.value = `${at} ，${inputs.comment.value}`
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

  utils.domUtils.off('click', submitBtn, submitEvt)
  utils.domUtils.on('click', submitBtn, submitEvt)
}

module.exports = MiniValineFactory
