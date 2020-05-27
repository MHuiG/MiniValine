import ajax from '../../plugins/ajax'

const Visitor = (util) => {
  try {
    var o = {}
    var parser = new uaparser()
    o.href = window.location.href
    o.parser = parser.getResult()
    createVisitor(AV.Object.extend(`${window.MV.MC.vc ? window.MV.MC.vc : 'Visitor'}` + '?v=' + Date.parse(new Date())), o, util)
  } catch (e) {}
}
const createVisitor = function (Visitor, o, util) {
  const newVisitor = new Visitor()
  const acl = new AV.ACL()
  acl.setPublicReadAccess(true)
  acl.setPublicWriteAccess(false)
  newVisitor.setACL(acl)
  newVisitor.set('href', o.href)
  newVisitor.set('ua', window.navigator.userAgent)
  newVisitor.set('parser', o.parser)
  newVisitor.set('language', window.navigator.language)
  newVisitor.set('languages', window.navigator.languages)
  newVisitor.set('cookieEnabled', window.navigator.cookieEnabled)
  newVisitor.set('platform', window.navigator.platform)
  newVisitor.set('connection', window.navigator.connection.effectiveType)
  newVisitor.set('screenwidth', window.screen.width)
  newVisitor.set('screenheight', window.screen.height)
  newVisitor.set('innerWidth', window.innerWidth)
  newVisitor.set('innerHeight', window.innerHeight)
  newVisitor.set('title', document.title)
  newVisitor.set('referrer', document.referrer)
  newVisitor.set('time', '' + Date.parse(new Date()))
  try {
    if (typeof window.MV.ip == 'undefined') {
      ajax({
        url: 'https://ip.zxinc.org/api.php',
        type: 'GET',
        data: {
          type: 'json'
        },
        success: function (data) {
          data = eval('(' + data + ')')
          window.MV.region = data
          window.MV.ip = data.data.myip
          try { newVisitor.set('ip', window.MV.ip) } catch (e) { newVisitor.set('ip', null) }
          try { newVisitor.set('region', window.MV.region) } catch (e) { newVisitor.set('region', null) }
          newVisitor.save({ log: window.MV }).catch(ex => {})
          if (typeof window.MV.ip == 'undefined') {
            var checkExistIP = setInterval(function () {
              if (typeof window.MV == 'undefined') return
              if (typeof window.MV.ip == 'undefined') return
              clearInterval(checkExistIP)
              try { util.Visitor() } catch (e) {}
            }, 100)
          }
        },
        fail (data) {
          var checkExistIP = setInterval(function () {
            if (typeof window.MV == 'undefined') return
            if (typeof window.MV.ip == 'undefined') return
            clearInterval(checkExistIP)
            try { util.Visitor() } catch (e) {}
          }, 100)
          try { newVisitor.set('ip', 'Fail') } catch (e) { newVisitor.set('ip', null) }
          try { newVisitor.set('region', window.MV.region) } catch (e) { newVisitor.set('region', null) }
          newVisitor.save({ log: window.MV }).catch(ex => {})
        }
      })
    } else {
      try { newVisitor.set('ip', window.MV.ip) } catch (e) { newVisitor.set('ip', null) }
      try { newVisitor.set('region', window.MV.region) } catch (e) { newVisitor.set('region', null) }
      newVisitor.save({ log: window.MV }).catch(ex => {})
    }
  } catch (e) {}
}
module.exports = Visitor
