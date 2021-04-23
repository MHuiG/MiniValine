import Bean from './Bean'
import getScript from '../plugins/getScript'
function WS (root) {
  const wsurl = `wss://${root.conf.serverURL.split('//')[1]}/ws`
  MV.websocket = new WebSocket(wsurl)
  MV.websocket.addEventListener('message', event => {
    const data = JSON.parse(event.data)
    // if (data.code) {
    //   console.log('Message received from server')
    //   console.log(data)
    // }
    // startWS
    if (data.code == 200) {
      MV.websocket.send(JSON.stringify({ opt: 'TotalPages', path: root.conf.path, pageSize: root.conf.pageSize, tz: new Date() }))
    }
    // previewEvt
    if (data.code == 1) {
      root.previewEvtWS(root, data.msg)
    }
    // count TotalPages
    if (data.code == 2) {
      root.el.querySelector('.count').innerHTML = data.count
      root.TotalPages = data.TotalPages
      root.parentQuery(1)
      // root.loading.hide(root.TotalPages)
    }
    // ParentList
    if (data.code == 3) {
      window.MV.PageData = data.msg
      const item = new Bean()
      window.MV.PageDataList = item.beanList(data.msg)
      root.fetchParentListWS(window.MV.PageDataList)
    }
    // postComment
    if (data.code == 4) {
      if (data.msg.comment) {
        const item = new Bean()
        item.create(data.msg)
        root.postComment.callback(item)
      }
    }
    if (data.code == 403) {
      if (data.msg && data.msg.code && data.msg.code == 506) {
        getScript(`${root.conf.serverURL}/ChallengeCaptcha`)
      } else if (data.msg && data.msg.code) {
        root.error(data.msg.code, data.msg.msg)
      } else {
        root.error(12138, data.msg)
      }
    }
  })
}
module.exports = WS
// https://datatracker.ietf.org/doc/rfc6455/
// https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API
