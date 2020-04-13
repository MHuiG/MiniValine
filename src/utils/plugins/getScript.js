const getScript = (src) => {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = src
  document.getElementsByTagName('head')[0].appendChild(script)
}
module.exports = getScript
