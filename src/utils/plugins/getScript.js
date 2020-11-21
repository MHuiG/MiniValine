const getScript = (src) => {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = src
  try { document.getElementsByTagName('head')[0].appendChild(script) } catch (e) {}
}
module.exports = getScript
