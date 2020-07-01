const barrager = (root) => {
  window.MV.barrager = {}
  window.MV.barrager.enable = 1
  let s = localStorage && localStorage.getItem('MiniValineBarrager')
  if (s) {
    s = JSON.parse(s)
    window.MV.barrager.url = s.url
  } else {
    window.MV.barrager.url = []
  }
  if (!isInArray(window.MV.barrager.url, document.location.href)) {
    window.MV.barrager.url.push(document.location.href)
    localStorage && localStorage.setItem(
      'MiniValineBarrager',
      JSON.stringify({
        url: window.MV.barrager.url
      })
    )
    import(/* webpackChunkName: "barrager" */'./plugins/barrager.js').then(({ barrager }) => {
      barrager()
    })
  }
}
function isInArray (arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (value === arr[i]) {
      return true
    }
  }
  return false
}
module.exports = barrager
