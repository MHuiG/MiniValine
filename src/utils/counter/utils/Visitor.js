const Visitor = (util) => {
  try {
    var o = Object.create(null)
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
    o.localStorage = JSON.stringify(window.localStorage)
    o.cookie = JSON.stringify(document.cookie)
    o.sessionStorage = JSON.stringify(window.sessionStorage)
    o.colorDepth = window.screen.colorDepth
    o.scrollTop = (window.pageYOffset || document.documentElement.scrollTop || (document.body && document.body.scrollTop) || 0)
    const Options = {
      preprocessor: null,
      audio: {
        timeout: 1000,
        excludeIOS11: true
      },
      fonts: {
        swfContainerId: 'fingerprintjs2',
        swfPath: 'flash/compiled/FontList.swf',
        userDefinedFonts: [],
        extendedJsFonts: false
      },
      screen: {
        detectScreenOrientation: true
      },
      plugins: {
        sortPluginsFor: [/palemoon/i],
        excludeIE: false
      },
      extraComponents: [],
      excludes: {
        enumerateDevices: true,
        pixelRatio: true,
        doNotTrack: true,
        fontsFlash: true
      },
      NOT_AVAILABLE: 'not available',
      ERROR: 'error',
      EXCLUDED: 'excluded'
    }
    if (window.requestIdleCallback) {
      requestIdleCallback(function () {
        Fingerprint2.getV18(Options, function (result, components) {
          window.MV.finger = {}
          window.MV.finger.hash = result
          window.MV.finger.components = components
        })
      })
    } else {
      setTimeout(function () {
        Fingerprint2.getV18(Options, function (result, components) {
          window.MV.finger = {}
          window.MV.finger.hash = result
          window.MV.finger.components = components
        })
      }, 500)
    }
    window.MV.log = o
  } catch (e) {}
}
module.exports = Visitor
