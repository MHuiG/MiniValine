import killXSS from '../killXSS'
const MarkDown = (root, o, render) => {
  if (root.md || typeof root.config.md == 'undefined') {
    import(/* webpackChunkName: "md" */'./md.js').then(({ markdown }) => {
      o.TEXT = markdown(o.TEXT)
      killXSS(o, render)
    })
  } else {
    killXSS(o, render)
  }
}
module.exports = MarkDown
