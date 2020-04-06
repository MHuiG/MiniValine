const killXSS = (o, render) => {
  import(/* webpackChunkName: "xss" */'./XSS.js').then(({ XSS }) => {
    o.TEXT = XSS(o.TEXT)
    render(o)
  })
}
module.exports = killXSS
