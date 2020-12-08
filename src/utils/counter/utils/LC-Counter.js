import Visitor from './Visitor'
const CounterFactory = {
  add (Counter) {
    try {
      /* 文章阅读量访问统计 */
      const lvs = document.querySelectorAll('.leancloud_visitors,.leancloud-visitors')
      addFun(Counter, lvs, 0)
      /* 全站访问统计 */
      const lpv = document.querySelectorAll('.leancloud_pv,.leancloud-pv')
      addFun(Counter, lpv, 1)
    } catch (e) {
      console.error(e)
    }
  }
}
const addFun = (Counter, lvs, ispv) => {
  if (lvs.length) {
    const lv = lvs[0]
    const url = lv.id
    const title = ispv ? 'PV' : lv.attributes['data-flag-title'].value
    const xid = encodeURI(url)
    const o = {
      el: lv,
      url: url,
      xid: xid,
      title: title
    }
    const query = new AV.Query(Counter)
    query.equalTo('url', url)
    query.find().then(ret => {
      if (ret.length > 0) {
        const v = ret[0]
        v.increment('time')
        v.save().then(rt => {
          lv.querySelector('.leancloud-visitors-count').innerText = rt.get('time')
        }).catch(ex => {
          console.error(ex)
        })
      } else {
        createCounter(Counter, o)
      }
    }).catch(ex => {
      ex.code == 101 && createCounter(Counter, o)
    })
  }
}
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
    o.el.querySelector('.leancloud-visitors-count').innerText = 1
  }).catch(ex => {
    console.error(ex)
  })
}

export function Counter () {
  CounterFactory.add(AV.Object.extend('Counter'))
  Visitor()
}
