import killXSS from './killXSS'
const MarkDown = (root, o, render) => {
  if ((((root.backend == 'waline') && o.preview) || (root.backend == 'lc')) && root.config.md) {
    import(/* webpackChunkName: "md" */'./md.js').then(({ markdown }) => {
      o.TEXT = markdown(o.TEXT)
      killXSS(o, render)
    })
  } else {
    killXSS(o, render)
  }
}
module.exports = MarkDown
