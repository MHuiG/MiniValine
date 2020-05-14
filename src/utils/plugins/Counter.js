const Utils = require('./domUtils')
const createCounter = function (Counter, o) {
  const newCounter = new Counter()
  const acl = new AV.ACL()
  acl.setPublicReadAccess(true)
  acl.setPublicWriteAccess(true)
  newCounter.setACL(acl)
  newCounter.set('url', o.url)
  newCounter.set('xid', o.xid)
  newCounter.set('title', o.title)
  newCounter.set('time', 1)
  newCounter.save().then(ret => {
    Utils.find(o.el, '.leancloud-visitors-count').innerText = 1
  }).catch(ex => {
    console.log(ex)
  })
}
const CounterFactory = {
  add (Counter, currPath) {
    const lvs = Utils.findAll(document, '.leancloud_visitors,.leancloud-visitors')
    if (lvs.length) {
      const lv = lvs[0]
      const url = Utils.attr(lv, 'id')
      const title = Utils.attr(lv, 'data-flag-title')
      const xid = encodeURI(url)
      const o = {
        el: lv,
        url: url,
        xid: xid,
        title: title
      }
      // 判断是否需要+1
      if (decodeURI(url) === decodeURI(currPath)) {
        const query = new AV.Query(Counter)
        query.equalTo('url', url)
        query.find().then(ret => {
          if (ret.length > 0) {
            const v = ret[0]
            v.increment('time')
            v.save().then(rt => {
              Utils.find(lv, '.leancloud-visitors-count').innerText = rt.get('time')
            }).catch(ex => {
              console.log(ex)
            })
          } else {
            createCounter(Counter, o)
          }
        }).catch(ex => {
          ex.code == 101 && createCounter(Counter, o)
        })
      } else CounterFactory.show(Counter, lvs)
    }
  },
  show (Counter, lvs) {
    const COUNT_CONTAINER_REF = '.leancloud-visitors-count'

    // 重置所有计数
    Utils.each(lvs, (idx, el) => {
      const cel = Utils.find(el, COUNT_CONTAINER_REF)
      if (cel) cel.innerText = 0
    })
    const urls = []
    for (const i in lvs) {
      if (lvs.hasOwnProperty(i)) urls.push(Utils.attr(lvs[i], 'id'))
    }
    if (urls.length) {
      const query = new AV.Query(Counter)
      query.containedIn('url', urls)
      query.find().then(ret => {
        if (ret.length > 0) {
          Utils.each(ret, (idx, item) => {
            const url = item.get('url')
            const time = item.get('time')
            const els = Utils.findAll(document, `.leancloud_visitors[id="${url}"],.leancloud-visitors[id="${url}"]`)
            Utils.each(els, (idx, el) => {
              const cel = Utils.find(el, COUNT_CONTAINER_REF)
              if (cel) cel.innerText = time
            })
          })
        }
      }).catch(ex => {
        console.error(ex)
      })
    }
  }
}

export function Counter () {
  window.CounterFactory = CounterFactory
}
