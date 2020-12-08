const killXSS = (o, render) => {
  if (o.NOXSS) {
    render(o)
    return
  }
  import(/* webpackChunkName: "xss" */'./XSS.js').then(({ XSS }) => {
    o.TEXT = XSS(o.TEXT)
    render(o)
  })
}
module.exports = killXSS
