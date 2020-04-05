import dom from './dom'
import killXSS from './killXSS'
import MathJaxSupport from './MathJax'
const parentQuery = (root) => {
  let num = 1
  root.parentCount = 0
  root.parentQuery = (pageNum = 1) => {
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
        vpage.innerHTML =
            root.pageSize * pageNum < root.parentCount
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
      root.loading.hide(root.parentCount)
      MathJaxSupport(root)
    }).catch((ex) => {
      console.log(ex)
      root.loading.hide(root.parentCount)
    })
  }
  root.v.Query.doCloudQuery(
      `select count(*) from Comment where (rid='' or rid is not exists) and (url='${root.Comment.url}' or url='${`${root.Comment.url}/`}') order by -createdAt`
  ).then((data) => {
    root.parentCount = data.count
    root.parentQuery(1)
  }).catch((ex) => {
    console.log(ex)
  })
}
module.exports = parentQuery
