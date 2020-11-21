import dom from './plugins/dom'
import killXSS from './plugins/killXSS'
const parentQuery = (root) => {
  let num = 1
  root.parentCount = 0
  root.parentQuery = (pageNum = 1) => {
    root.loading.show()
    const cq = root.v.Query
      .doCloudQuery(`select nick, comment, link, rid, isSpam, mailMd5, ua ${root.config.region ? ',log' : ''} from Comment where (rid='' or rid is not exists) and (url='${root.C.url}' or url='${`${root.C.url}/`}') order by -createdAt limit ${(pageNum - 1) * root.pageSize},${root.pageSize}`)
    cq.then((rets) => {
      console.log(rets)
      rets = (rets && rets.results) || []
      const len = rets.length
      if (len) {
        for (let i = 0; i < len; i++) {
          if (i == 0) {
            root.loading.hide(root.parentCount)
          }
          if (rets[i].get('isSpam')) continue
          const render = (o) => {
            rets[i].set('comment', o.TEXT)
            const parentVcard = root.insertComment(
              rets[i],
              root.el.querySelector('.vlist'),
              false
            )
            parentVcard.setAttribute('style', 'margin-bottom: .5em')
            root.nestQuery(parentVcard)
          }
          rets[i].TEXT = rets[i].get('comment')
          killXSS(rets[i], render)
        }
        const vpage = root.el.querySelector('.vpage')
        vpage.innerHTML = root.pageSize * pageNum < root.parentCount
          ? `<div id="vmore" class="more">${root.i18n.more}</div>`
          : ''
        const vmore = vpage.querySelector('#vmore')
        if (vmore) {
          dom.on('click', vmore, (e) => {
            vpage.innerHTML = ''
            root.parentQuery(++num)
          })
        }
      }
      try {
        if ((typeof window.MV.barrager.bottom != 'undefined') && ((typeof root.config.barrager == 'undefined') || (root.config.barrager == 1))) {
          window.MV.barrager.enable = 0
        }
      } catch (e) {}
      root.loading.hide(root.parentCount)
    }).catch((ex) => {
      // console.log(ex)
      root.loading.hide(root.parentCount)
    })
  }
  root.parentQuery(1)
}
module.exports = parentQuery
