import { MVUrl } from '../Default'
import timeAgo from './timeago'
const vcard = function (root, m) {
  if (m.get('nick')) {
    m.set('nick', m.get('nick').slice(0, 20).trim().replace(/&/g, '&amp;').replace(/\//g, '&#x2F').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;'))
  }
  if (m.get('link')) {
    m.set('link', m.get('link').slice(0, 20).trim().replace(/&/g, '&amp;').replace(/\//g, '&#x2F').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;'))
  }
  const Hash = m.get('mailMd5')
  const gravatarUrl = `${root.conf.avatarUrl + '/' + Hash}?s=48&d=${root.conf.avatarD}`
  if (root.conf.barrager) {
    root.Vbarrager(root, m, gravatarUrl)
  }
  if (root.conf.mode === 'DesertsP') {
    return root.Vcard(root, m, gravatarUrl)
  } else if (root.conf.mode === 'xCss') {
    let ua = m.get('ua') || ''
    let uaMeta = ''
    const svgstr = MVUrl + '/imgs/svg/'
    if ((ua || (root.conf.backend == 'waline')) && root.conf.enableUA) {
      try {
        let bn = ''
        let on = ''
        if (ua) {
          ua = uaparser(ua)
          if (ua.browser && ua.browser.name) {
            bn = ua.browser.name.toLowerCase()
          }
          if (ua.os && ua.os.name) {
            on = ua.os.name.toLowerCase()
          }
        } else if (root.conf.backend == 'waline') {
          bn = m.get('browser').split(' ')[0].toLowerCase()
          on = m.get('os').split(' ')[0].toLowerCase()
        }
        if (bn) {
          uaMeta += '<span class="vsys"><i><embed class="msvg" src="' + svgstr
          if (['mobile', 'samsung', 'samsung browser'].includes(bn)) {
            uaMeta += 'mobile-alt'
          } else if (['android', 'android browser'].includes(bn)) {
            uaMeta += 'android'
          } else if (['mobile safari', 'safari'].includes(bn)) {
            uaMeta += 'safari'
          } else if (['ie', 'iemobile'].includes(bn)) {
            uaMeta += 'internet-explorer'
          } else if (['wechat'].includes(bn)) {
            uaMeta += 'weixin'
          } else if (['qqbrowser', 'qqbrowserlite', 'qq'].includes(bn)) {
            uaMeta += 'qq'
          } else if (['baiduboxapp', 'baidu'].includes(bn)) {
            uaMeta += 'paw'
          } else if (['chrome', 'chromium', 'chrome headless', 'chrome webview'].includes(bn)) {
            uaMeta += 'chrome'
          } else if (['opera mobi', 'opera', 'opera coast', 'opera mini', 'opera tablet'].includes(bn)) {
            uaMeta += 'opera'
          } else if (['firefox', 'edge'].includes(bn)) {
            uaMeta += bn
          } else {
            uaMeta += 'snapchat-ghost'
          }
          if (ua) {
            uaMeta += '.svg"/></i>' +
			ua.browser.name +
			' ' +
			(ua.browser.version ? ua.browser.version : '') +
			'</span>' +
			' '
          } else if (root.conf.backend == 'waline') {
            uaMeta += '.svg"/></i>' +
			m.get('browser') +
			'</span>'
          }
        } else {
          uaMeta += '<span class="vsys"><i><embed class="msvg" src="' + svgstr + 'stars.svg"/></i>Magical APP</span>'
        }
        if (on) {
          uaMeta += '<span class="vsys"><i><embed class="msvg" src="' + svgstr
          if (['mac', 'mac os', 'ios'].includes(on)) {
            uaMeta += 'apple'
          } else if (['chromium', 'chromium os'].includes(on)) {
            uaMeta += 'chrome'
          } else if (['firefox', 'firefox os'].includes(on)) {
            uaMeta += 'firefox'
          } else if (['windows phone', 'windows'].includes(on)) {
            uaMeta += 'windows'
          } else if (['android', 'linux', 'ubuntu', 'suse', 'redhat', 'fedora', 'centos', 'blackberry'].includes(on)) {
            uaMeta += on
          } else {
            uaMeta += 'snapchat-ghost'
          }
          if (ua) {
            uaMeta += '.svg"/></i>' +
			ua.os.name +
			' ' +
			(ua.os.version ? ua.os.version : '') +
            '</span>'
          } else if (root.conf.backend == 'waline') {
            uaMeta += '.svg"/></i>' +
			m.get('os') +
			'</span>'
          }
        } else {
          uaMeta += '<span class="vsys"><i><embed class="msvg" src="' + svgstr + 'magic.svg"/></i>Magical OS</span>'
        }
      } catch (e) {}
    }
    if (root.conf.region) {
      try {
        const loc = m.get('log').region.data.location
        if (loc) {
          uaMeta += '<span class="vsys"><i><embed class="msvg" src="' + svgstr + 'map.svg"/></i>' + loc + '</span>'
        }
      } catch (e) {}
    }
    let gat = ''
    if (root.conf.enableFlag && (!root.conf.cloudflag)) {
      try {
        root.conf.master = root.conf.master.map(i => i.toLowerCase())
        root.conf.friends = root.conf.friends.map(i => i.toLowerCase())
        const ism = root.conf.master.includes(m.get('mailMd5').toLowerCase())
        const isf = root.conf.friends.includes(m.get('mailMd5').toLowerCase())
        gat = ism
          ? '<span class="vtag vmaster">' +
        root.conf.tagMeta[0] +
        '</span>'
          : isf
            ? '<span class="vtag vfriend">' +
			root.conf.tagMeta[1] +
			'</span>'
            : '<span class="vtag vvisitor">' +
			root.conf.tagMeta[2] +
			'</span>'
      } catch (e) {}
    }
    if (root.conf.enableFlag && root.conf.cloudflag) {
      try {
        const vRoles = root.cloudFlag.Roles
        const ehash = m.get('mailMd5').toLowerCase()
        const vflag = root.cloudFlag.Users[ehash]
        if (!vflag) {
          gat = '<span class="vtag" style="background:' + `${vRoles.visitor && vRoles.visitor.color ? vRoles.visitor.color : '#828282'}` + ';">' + `${vRoles.visitor && vRoles.visitor.nick ? vRoles.visitor.nick : 'visitor'}` + '</span>'
        } else {
          gat = '<span class="vtag" style="background:' + `${root.cloudFlag.Roles[vflag] && root.cloudFlag.Roles[vflag].color ? root.cloudFlag.Roles[vflag].color : '#6cf'}` + ';">' + `${root.cloudFlag.Roles[vflag] && root.cloudFlag.Roles[vflag].nick ? root.cloudFlag.Roles[vflag].nick : 'visitor'}` + '</span>'
        }
      } catch (e) {}
    }
    let HTML = '<div class="vcomment-body">' +
			'<div class="vhead" >' +
				`<img class="vavatar lazyload" data-src="${gravatarUrl}"/>` +
				`<a rid='${m.id}' at='@${m.get('nick')}' class="vat" id="at-${m.id}">${root.i18n.reply}</a>` +
				`<div class="vmeta-info">${m.get('link') ? `<a class="vname" href="${m.get('link')}" target="_blank" rel="nofollow" > ${m.get('nick')}</a>${gat}<span class="vsysinfo">${uaMeta}</span>` : `<span class="vname">${m.get('nick')}</span> ${gat} ${uaMeta}`}` +
				`<br/><span class="vtime">${timeAgo(m.get('createdAt'), root.i18n)}</span>` +
				'</div>' +
			'</div>' +
			`<section class="text-wrapper"  id="comment-${m.id}">`
    if (root.conf.backend == 'waline') {
      // 兼容处理
      HTML += `<div class="comment-item" style="display: none">${window.btoa(unescape(encodeURIComponent(JSON.stringify(m))))}</div>`
    }
    HTML += `<div class="vcomment">${m.get('comment')}</div>` +
			'</section>' +
		'</div>' +
		'<div class="vcomment-children">' +
			'<div class="vshow-children-wrapper" style="display: none"></div>' +
			`<ul class="vlist" id="children-list-${m.id}"></ul>` +
		'</div>'
    return HTML
  }
}

module.exports = vcard
