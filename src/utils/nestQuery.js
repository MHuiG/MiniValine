import dom from './plugins/dom'
import killXSS from './plugins/killXSS'
const nestQuery = (root) => {
  root.nestQuery = (vcard, level = 1) => {
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
            dom.on('click', showChildren, (e) => {
              showChildrenWrapper.setAttribute(
                'style',
                'display: none !important;'
              )
              root.nestQuery(vcard, -1000)
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
                const vl = root.insertComment(rets[i], _vlist, true)
                root.nestQuery(vl, level + 1)
              }
              rets[i].TEXT = rets[i].get('comment')
              killXSS(rets[i], render)
            }
          }
        }
      })
      .catch((ex) => {
        console.log(ex)
        root.loading.hide(root.parentCount)
      })
  }
}
module.exports = nestQuery
