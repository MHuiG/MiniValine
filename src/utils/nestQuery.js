import dom from './plugins/dom'
const nestQuery = (root) => {
  root.nestQuery = (vcard, level = 1) => {
    const vchild = vcard.querySelector('.vcomment-children')
    const _vlist = vchild.querySelector('.vlist')
    const _id = vcard.getAttribute('id')
    if (level <= 0) {
      vchild.setAttribute('style', 'margin-left: 0 !important')
    }
    if (level >= root.conf.maxNest) {
      const callback = (count) => {
        if (count > 0) {
          const showChildrenWrapper = vchild.querySelector('.vshow-children-wrapper')
          showChildrenWrapper.setAttribute('style', 'display: block !important;')
          showChildrenWrapper.innerHTML = `<span class="vshow-children" rid="${_id}">${root.i18n.more}</span>`
          const showChildren = showChildrenWrapper.querySelector('.vshow-children')
          typeof root.conf.PageLoaded === 'function' && root.conf.PageLoaded()
          dom.on('click', showChildren, (e) => {
            showChildrenWrapper.setAttribute('style', 'display: none !important;')
            root.nestQuery(vcard, -1000)
          })
        }
      }
      root.fetchNextCount(root, _id, callback)
      return
    }
    setTimeout(function () {
      const callback = (rets) => {
        const len = rets.length
        if (len) {
          for (let i = 0; i < len; i++) {
            if (!rets[i].get('isSpam')) {
              const vl = root.insertComment(rets[i], _vlist, true)
              root.nestQuery(vl, level + 1)
            }
          }
        }
      }
      root.fetchNextList(root, _id, callback)
    }, level * 60)
  }
}
module.exports = nestQuery
