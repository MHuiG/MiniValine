import timeAgo from './timeago'
const vcard = function (root, m) {
  const Hash = m.get('mailMd5')
  const gravatarUrl = `${root.conf.avatarUrl + '/' + Hash}?s=48&d=${root.conf.avatarD}`

  let HTML = '<div class="vcomment-body">' +
			'<div class="vhead" >' +
				`<img class="vavatar lazyload" data-src="${gravatarUrl}"/>` +
				`<a rid='${m.id}' at='@${m.get('nick')}' class="vat" id="at-${m.id}">${root.i18n.reply}</a>` +
				`<div class="vmeta-info">${m.get('link') ? `<a class="vname" href="${m.get('link')}" target="_blank" rel="nofollow" > ${m.get('nick')}</a>` : `<span class="vname">${m.get('nick')}</span> `}` +
				`<br/><span class="vtime">${timeAgo(m.get('createdAt'), root.i18n)}</span>` +
				'</div>' +
			'</div>' +
			`<section class="text-wrapper"  id="comment-${m.id}">`

  HTML += `<div class="comment-item" style="display: none">${window.btoa(encodeURIComponent(JSON.stringify(m)))}</div>`
  HTML += `<div class="vcomment">${m.get('comment')}</div>` +
			'</section>' +
		'</div>' +
		'<div class="vcomment-children">' +
			'<div class="vshow-children-wrapper" style="display: none"></div>' +
			`<ul class="vlist" id="children-list-${m.id}"></ul>` +
		'</div>'
  return HTML
}

module.exports = vcard
