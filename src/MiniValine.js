import 'highlight.js/styles/github.css'
import 'lazysizes'
import md from 'marked'
import Utils from './utils/domUtils'
import timeAgo from './utils/timeago'
import check from './utils/check'
import format from 'string-format'
import xss from 'xss'
import crypto from 'blueimp-md5'
import i18n from './i18n'
import { MaxNestLevel, PageSize, EmoticonList, EmoticonUrl, AVSdkUrl, GravatarBaseUrl, DefaultEmailHash, store, defaultComment } from './const'
import MathJaxSupport from './fun/MathJax'
import GetIP from './fun/GetIP'

const MiniValineFactory = function (option) {
  const root = this
  root.config = option
  root.init()
}

MiniValineFactory.prototype.init = function () {
  const root = this
  GetIP()
  root.initAV()
}

MiniValineFactory.prototype.initAV = function () {
  const root = this
  if (typeof AV === 'undefined') {
    Utils.dynamicLoadSource('script', { src: AVSdkUrl }, () => {
      if (typeof AV === 'undefined') {
        setTimeout(() => {
          root.initAV()
        }, 300)
      } else !!root.config && root.initMiniValine()
    })
  } else !!root.config && root.initMiniValine()
}

MiniValineFactory.prototype.initMiniValine = function () {
  const root = this
  root.emoticonUrl = root.config.emoticonUrl || EmoticonUrl
  root.emoticonList = root.config.emoticonList || EmoticonList
  root.i18n = i18n(root.config.lang || navigator.language || navigator.userLanguage)
  root.maxNestLevel = root.config.maxNest || MaxNestLevel
  root.pageSize = root.config.pageSize || PageSize
  root.adminEmailMd5 = root.config.adminEmailMd5 || ''
  root.disableAVInit = false
  root.math = root.config.math || false
  defaultComment.url =
      root.config.pathname || location.pathname.replace(/\/$/, '')
  try {
    const el =
        toString.call(root.config.el) === '[object HTMLDivElement]'
          ? root.config.el
          : document.querySelectorAll(root.config.el)[0]
    if (toString.call(el) !== '[object HTMLDivElement]') {
      return
    }
    root.el = el
    root.el.classList.add('MiniValine')
    md.setOptions({
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: true,
      highlight (code) {
        return require('highlight.js').highlightAuto(code).value
      }
    })
    const placeholder = root.config.placeholder || ''
    const eleHTML = '<div id="vinputs-placeholder">' +
                      '<div class="vinputs-wrap">' +
                       `<p class="vcancel-comment-reply" href="#" rel="nofollow" style="display:none">${root.i18n.t('cancelReply')}</p>` +
                                '<div class="vinputs-area">' +
                                    '<div class="textarea-wrapper">' +
                                        '<div class="commentTrigger">' +
                                            `<div class="avatar"><img class="visitor_avatar lazyload" data-src="${`${GravatarBaseUrl + DefaultEmailHash}?size=80`}"></div>` +
                                            `<div class="trigger_title">${placeholder}</div>` +
                                        '</div>' +
                                        '<div class="veditor-area">' +
                                            '<textarea placeholder="" class="veditor"></textarea>' +
                                            '<div class="btn-wrap">' +
                                                `<div class="vpreview-btn vfunction-btn" title="${root.i18n.t('preview')}">` +
												'<svg t="1551146416896" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2051" xmlns:xlink="http://www.w3.org/1999/xlink" width="1.5em" height="1.5em"><defs><style type="text/css"></style></defs><path d="M862.516 161.07l44.62 44.38-286.303 288.866-45.668-45.615L862.516 161.07z m1.233 1.233" p-id="2052"></path><path d="M832.162 959.558H128.025V191.784h512.099v64.169H192.037V895.64h576.112V512.127h64.012v447.431z m0.833 0.533" p-id="2053"></path><path d="M256.05 703.994h384.075v63.919H256.05v-63.919z m0-127.769l320.062-0.069v63.919H256.05v-63.85z m0-128.317h192.037v63.891l-192.037 0.028v-63.919z m0 0" p-id="2054"></path></svg></div>' +
                                                `<div class="vemoji-btn vfunction-btn" title="${root.i18n.t('emoji')}">` +
												'<svg t="1551146424708" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2169" xmlns:xlink="http://www.w3.org/1999/xlink" width="1.5em" height="1.5em"><defs><style type="text/css"></style></defs><path d="M513.028 63.766c-247.628 0-448.369 200.319-448.369 447.426S265.4 958.617 513.028 958.617s448.369-200.319 448.369-447.426S760.655 63.766 513.028 63.766z m-0.203 823.563c-207.318 0-375.382-167.71-375.382-374.592s168.064-374.592 375.382-374.592 375.382 167.71 375.382 374.592-168.064 374.592-375.382 374.592z" p-id="2170"></path><path d="M514.029 767.816c-99.337 0-188.031-54.286-251.889-146.146-10.647-16.703-7.1-33.399 7.094-45.93 14.192-12.529 28.384-8.349 39.025 8.349 49.67 75.164 124.174 116.92 205.77 116.92s163.199-45.93 209.316-125.268c10.647-16.703 24.833-16.703 39.025-8.349 14.194 12.524 14.194 29.227 7.094 45.93-60.312 96.035-152.553 154.494-255.435 154.494zM464.292 402.959l-45.151-45.151-0.05 0.05-90.45-90.45-45.15 45.15 90.45 90.45-90.45 90.451 45.15 45.15 90.45-90.45 0.05 0.05 45.151-45.151-0.05-0.05zM556.611 402.959l45.151-45.151 0.05 0.05 90.45-90.45 45.15 45.15-90.45 90.45 90.45 90.451-45.15 45.15-90.45-90.45-0.05 0.05-45.151-45.151 0.05-0.05z" p-id="2171"></path></svg></div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="vextra-area">' +
                                            '<div class="vsmile-icons" style="display:none"></div>' +
                                            '<div class="vpreview-text" style="display:none"></div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<section class="auth-section" style="display:none;">' +
                                        `<div class="input-wrapper"><input type="text" name="author" class="vnick" placeholder="${root.i18n.t('nick')}" value=""></div>` +
                                        `<div class="input-wrapper"><input type="email" name="email" class="vmail" placeholder="${root.i18n.t('mail')}" value=""></div>` +
                                        `<div class="input-wrapper"><input type="text" name="website" class="vlink" placeholder="${root.i18n.t('link')}" value=""></div>` +
                                        `<div class="post-action"><button type="button" class="vsubmit">${root.i18n.t('reply')}</button></div>` +
                                    '</section>' +
                                    '<div style="display:none;" class="vmark"></div>' +
                                '</div>' +
                                '<div class="vsubmitting" style="display:none;"></div>' +
                            '</div>' +
                           '</div>' +
                           '<div class="info">' +
                                `<div class="col"> ${format(root.i18n.t('commentCount'), '<span class="count">0</span>')}</div>` +
                           '</div>' +
                           '<ul class="vlist"><li class="vempty"></li></ul>' +
                           '<div class="vloading"></div>' +
                           '<div class="vpage txt-center"></div>'
    root.el.innerHTML = eleHTML
    // Empty Data
    const vempty = root.el.querySelector('.vempty')
    root.nodata = {
      show (txt) {
        vempty.innerHTML = txt || root.i18n.t('noCommentYet')
        vempty.setAttribute('style', 'display:block;')
      },
      hide () {
        vempty.setAttribute('style', 'display:none;')
      }
    }
    root.nodata.show()

    // load smiles image
    const smileWrapper = root.el.querySelector('.vsmile-icons')
    const smileNames = root.emoticonList || []
    for (const i in smileNames) {
      const img = document.createElement('img')
      img.setAttribute(
        'data-src',
          `${root.emoticonUrl}/${smileNames[i]}`
      )
      img.setAttribute('class', 'lazyload')
      smileWrapper.appendChild(img)
    }

    // set serverURLs
    let prefix = 'https://'
    let serverURLs = ''
    if (!root.config.serverURLs) {
      switch (root.config.appId.slice(-9)) {
        // TAB
        case '-9Nh9j0Va':
          prefix += 'tab.'
          break
          // US
        case '-MdYXbMMI':
          prefix += 'us.'
          break
        default:
          break
      }
    }
    serverURLs = root.config.serverURLs || `${prefix}avoscloud.com`

    if (!root.disableAVInit) {
      AV.init({
        appId: root.config.appId || root.config.appId,
        appKey: root.config.appKey || root.config.appKey,
        serverURLs
      })
      root.disableAVInit = true
    }
    root.v = AV
  } catch (ex) {
    console.log(ex)
    return
  }

  // loading
  const spinner =
      '<div class="spinner"><div class="r1"></div><div class="r2"></div><div class="r3"></div><div class="r4"></div><div class="r5"></div></div>'
  const vloading = root.el.querySelector('.vloading')
  vloading.innerHTML = spinner
  // loading control
  root.loading = {
    show () {
      vloading.setAttribute('style', 'display:block;')
      root.nodata.hide()
    },
    hide () {
      vloading.setAttribute('style', 'display:none;')
      root.el.querySelectorAll('.vcard').length === 0 && root.nodata.show()
    }
  }

  root.loading.hide()

  const vsubmitting = root.el.querySelector('.vsubmitting')
  vsubmitting.innerHTML = spinner
  root.submitting = {
    show () {
      vsubmitting.setAttribute('style', 'display:block;')
    },
    hide () {
      vsubmitting.setAttribute('style', 'display:none;')
      root.nodata.hide()
    }
  }

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
      mark.querySelector('.vcancel').addEventListener('click', e => {
        root.alert.hide()
      })
      mark.setAttribute('style', 'display:block;')
      if (o && o.type) {
        const ok = mark.querySelector('.vsure')
        Utils.on('click', ok, e => {
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
  Utils.on('click', vsmiles, e => {
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
  Utils.on('click', commentTrigger, e => {
    commentTrigger.setAttribute('style', 'display:none')
    root.el.querySelector('.auth-section').removeAttribute('style')
    root.el.querySelector('.veditor').focus()
  })

  // cancel reply
  Utils.on('click', root.el.querySelector('.vcancel-comment-reply'), e => {
    root.reset()
  })

  // Query && show comment list

  const expandEvt = el => {
    if (el.offsetHeight > 180) {
      el.classList.add('expand')
      Utils.on('click', el, e => {
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
          Utils.on('click', vmore, e => {
            vpage.innerHTML = ''
            parentQuery(++num)
          })
        }
      }
      root.loading.hide()
      MathJaxSupport(root.math)
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
            Utils.on('click', showChildren, e => {
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
    const emailHash = comment.get('emailHash')
    const gravatarUrl = `${GravatarBaseUrl + emailHash}?size=80&d=https%3a%2f%2fgravatar.loli.net%2favatar%2f9e63c80900d106cbbec5a9f4ea433a3e.jpg%3fsize%3d80`
    // language=HTML
    _vcard.innerHTML = '<div class="vcomment-body">' +
                                    '<div class="vhead" >' +
                                        `<img class="vavatar lazyload" data-src="${gravatarUrl}"/>` +
                                        `<a rid='${comment.id}' at='@${comment.get('nick')}' class="vat" id="at-${comment.id}">${root.i18n.t('reply')}</a>` +
                                        `<div class="vmeta-info">${comment.get('link') ? `<a class="vname" href="${comment.get('link')}" target="_blank" rel="nofollow" > ${comment.get('nick')}</a>` : `<span class="vname">${comment.get('nick')}</span>`}${emailHash === root.adminEmailMd5.toLowerCase().trim() ? '<span class="spacer">·</span><span class="vtime"><svg xmlns:xlink="http://www.w3.org/1999/xlink" p-id="1615" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" style="height: .8em;width: .8em;fill: #777;" class="icon" t="1559101574545"><defs><style type="text/css"></style></defs><path d="M582.044306 993.554603l17.113098-99.494753-72.233191-70.442285c-25.072678-24.27672-34.027206-57.109988-24.07773-87.555383 9.949475-30.445394 36.41508-51.538282 70.840264-56.51302l87.356393-12.735328c-3.780801-2.586864-7.163622-5.173727-10.347454-7.95958-10.944423-9.551496-18.705014-19.699961-23.480762-30.047415s-7.561601-21.092888-8.15857-31.440342c-0.596969-10.546444 0-20.893898 1.989895-31.042363 1.392927-8.15857 3.581811-15.123202 6.168675-20.893898 2.586864-5.770696 5.969685-10.546444 10.148465-14.725223 4.17878-3.97979 8.755538-7.95958 14.327244-11.541391 5.571706-3.780801 11.143412-8.15857 17.312087-13.730276 5.372717-4.775748 10.148465-11.342402 14.725223-19.898951 4.17878-8.357559 8.15857-17.113098 11.541391-25.868636 3.382822-9.949475 6.566654-20.694909 9.153517-31.440342 6.765643-1.989895 13.133307-5.571706 19.301982-11.143412 5.372717-4.775748 10.148465-11.342402 14.725223-19.898951 4.17878-8.556549 7.561601-19.699961 9.551496-34.027206 1.392927-10.944423 1.193937-19.898951-0.397979-27.460552-1.591916-7.561601-3.97979-13.531286-6.566654-18.307035-2.586864-5.571706-6.367664-9.750486-11.143412-12.337349 0.596969-27.062573-0.994948-54.324135-5.173727-81.386708-3.183832-23.082783-9.153517-47.558492-17.710066-73.626117s-21.291877-49.946366-38.205985-71.636222c-7.561601-9.551496-17.312087-18.904003-29.649436-28.05752-11.93937-9.153517-26.067625-17.312087-41.588807-24.873688-15.720171-7.561601-32.43529-13.531286-50.344345-18.307035s-37.012048-7.163622-56.51302-7.163622c-15.720171 0-31.838321 1.591916-48.35445 4.17878-16.715119 2.984843-33.032258 7.561601-49.349398 14.327244-16.31714 6.765643-32.43529 16.11815-48.35445 28.05752s-30.246405 27.062573-43.180723 45.369607c-13.531286 19.500972-23.878741 41.588807-31.042363 66.064516-7.163622 24.475709-12.13836 47.558492-14.725223 69.248348-3.581811 25.868636-4.775748 51.737272-4.17878 77.406918-5.571706 6.964633-9.750486 13.929265-12.337349 21.490867-2.785853 6.765643-4.576759 14.725223-5.571706 23.878741-1.193937 9.153517 0 19.699961 3.382822 31.042363 3.581811 11.541391 7.561601 20.29693 12.337349 26.465604 4.775748 6.168675 9.153517 10.944423 13.332297 14.327244 4.775748 3.581811 9.551496 5.770696 14.327244 7.163622 3.382822 10.745433 6.765643 21.291877 10.148465 31.440342 3.382822 8.755538 6.964633 17.312087 11.143412 25.868636 4.17878 8.556549 8.755538 15.123202 14.327244 19.898951 11.740381 9.551496 21.888846 18.705014 31.042363 27.460552 9.153517 8.755538 14.327244 21.291877 15.720171 37.609017 0.596969 10.347454 0.994948 19.898951 0.994948 28.654489 0 8.954528-1.591916 17.312087-4.576759 25.470657-2.984843 8.15857-8.556549 16.31714-16.31714 24.475709-7.760591 8.15857-18.705014 16.715119-33.032258 25.470657-17.511077 11.541391-38.006996 20.29693-61.487757 26.465604-23.480762 6.168675-125.761368 41.389817-147.849203 48.951419-21.888846 7.362612-41.190828 17.511077-57.507967 30.445394-16.11815 12.735328-26.266615 31.838321-30.445394 56.910999C2.387875 881.52351 0.994949 888.488143 4.57676 916.346674c3.581811 27.659541 9.153517 44.17567 16.715119 49.747377 6.168675 4.576759 23.679751 10.148465 52.931209 16.715119 29.251457 6.566654 213.11776 41.190828 426.633501 41.190828 27.858531 0 54.722114-0.596969 80.59075-1.790906C580.253401 1012.856585 580.45239 1003.305088 582.044306 993.554603z" p-id="1616"></path><path d="M1004.300038 748.399532l-106.459386-15.521182c-16.31714-2.387874-35.619122-16.31714-42.981733-31.241353l-47.558492-96.509911c-3.581811-7.362612-8.556549-11.143412-13.332297-11.143412-4.775748 0-9.551496 3.780801-13.332297 11.143412l-47.558492 96.509911c-7.362612 14.725223-26.664594 28.853478-42.981733 31.241353l-106.459386 15.521182c-16.31714 2.387874-20.09794 13.730276-8.15857 25.271667l77.008939 75.019044c11.740381 11.541391 19.102993 34.226195 16.31714 50.543335l-18.108045 106.061407c-1.989895 11.740381 2.586864 18.705014 10.745433 18.705014 3.183832 0 6.765643-0.994948 10.745433-3.183832l95.116984-50.145356c7.362612-3.780801 16.914108-5.770696 26.465604-5.770696 9.551496 0 19.301982 1.989895 26.465604 5.770696l95.116984 50.145356c3.97979 2.188885 7.760591 3.183832 10.745433 3.183832 8.15857 0 12.735328-6.964633 10.745433-18.705014l-18.108045-106.061407c-2.785853-16.31714 4.576759-39.001943 16.31714-50.543335l77.008939-75.019044C1024.198988 762.129808 1020.617177 750.787406 1004.300038 748.399532z" p-id="1617"></path></svg></span><span class="spacer">·</span>' : '<span class="spacer">·</span>'}` +
										`<span class="vtime">${timeAgo(comment.get('createdAt'), root.i18n)}</span>` +
                                        '</div>' +
                                    '</div>' +
                                    `<section class="text-wrapper"  id="comment-${comment.id}">` +
                                        `<div class="vcomment">${comment.get('comment')}</div>` +
                                    '</section>' +
                                '</div>' +
                                '<div class="vcomment-children">' +
                                    '<div class="vshow-children-wrapper" style="display: none"></div>' +
                                    `<ul class="vlist" id="children-list-${comment.id}"></ul>` +
                                '</div>'
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
      Utils.on('input', _el, e => {
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
      md(
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
    const mailRet = check.mail(defaultComment.mail)
    const linkRet = check.link(defaultComment.link)
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
  Utils.on('click', smileBtn, e => {
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
  Utils.on('click', previewBtn, e => {
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
        md(
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
    MathJaxSupport(root.math)
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
        MathJaxSupport(root.math)
      })
      .catch(ex => {
        root.submitting.hide()
      })
  }

  // at event
  const bindAtEvt = vcard => {
    const _id = vcard.getAttribute('id')
    const _vat = vcard.querySelector(`#at-${_id}`)
    Utils.on('click', _vat, e => {
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

  Utils.off('click', submitBtn, submitEvt)
  Utils.on('click', submitBtn, submitEvt)
}

module.exports = MiniValineFactory
