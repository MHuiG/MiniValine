import ajax from '../../plugins/ajax'

const Visitor = (util) => {
  try {
    var o = {}
    var parser = new uaparser()
    var testdate = new Date()
    o.time = testdate.getTime()
    o.href = window.location.href
    o.parser = parser.getResult()
    o.userAgent = window.navigator.userAgent
    o.language = window.navigator.language
    o.languages = window.navigator.languages
    o.cookieEnabled = window.navigator.cookieEnabled
    o.platform = window.navigator.platform
    o.connection = window.navigator.connection.effectiveType
    o.screenwidth = window.screen.width
    o.screenheight = window.screen.height
    o.innerWidth = window.innerWidth
    o.innerHeight = (window.innerHeight || document.documentElement.clientHeight || (document.body && document.body.clientHeight) || 0)
    o.title = document.title
    o.referrer = document.referrer
    o.localStorage = window.localStorage
    o.cookie = document.cookie
    o.sessionStorage = window.sessionStorage
    o.colorDepth = window.screen.colorDepth
    o.scrollTop = (window.pageYOffset || document.documentElement.scrollTop || (document.body && document.body.scrollTop) || 0)
    window.MV.log = o
    createVisitor(AV.Object.extend(`${window.MV.MC.vc ? window.MV.MC.vc : 'Visitor'}` + '?v=' + o.time), o, util)
  } catch (e) {}
}
const createVisitor = function (Visitor, o, util) {
  const newVisitor = new Visitor()
  const acl = new AV.ACL()
  acl.setPublicReadAccess(true)
  acl.setPublicWriteAccess(false)
  newVisitor.setACL(acl)
  newVisitor.set('href', o.href)
  newVisitor.set('ua', o.userAgent)
  newVisitor.set('parser', o.parser)
  newVisitor.set('language', o.language)
  newVisitor.set('languages', o.languages)
  newVisitor.set('cookieEnabled', o.cookieEnabled)
  newVisitor.set('platform', o.platform)
  newVisitor.set('connection', o.connection)
  newVisitor.set('screenwidth', o.screenwidth)
  newVisitor.set('screenheight', o.screenheight)
  newVisitor.set('innerWidth', o.innerWidth)
  newVisitor.set('innerHeight', o.innerHeight)
  newVisitor.set('title', o.title)
  newVisitor.set('referrer', o.referrer)
  newVisitor.set('time', '' + o.time)
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
          window.MV.fuck = 1
          if (typeof window.MV.ip == 'undefined') {
            window.MV.fuck = 0
            var checkExistIP = setInterval(function () {
              if (typeof window.MV == 'undefined') return
              if (typeof window.MV.ip == 'undefined') return
              clearInterval(checkExistIP)
              try { util.Visitor() } catch (e) {}
            }, 100)
          }
        },
        fail (data) {
          window.MV.fuck = 0
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
      window.MV.fuck = 1
      try { newVisitor.set('ip', window.MV.ip) } catch (e) { newVisitor.set('ip', null) }
      try { newVisitor.set('region', window.MV.region) } catch (e) { newVisitor.set('region', null) }
      newVisitor.save({ log: window.MV }).catch(ex => {})
    }
  } catch (e) {}
}
module.exports = Visitor
