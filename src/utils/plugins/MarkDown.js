import killXSS from './killXSS'
const MarkDown = (root, o, render) => {
  if ((((root.conf.backend == 'waline') && o.preview) || (root.conf.backend == 'lc')) && root.conf.md) {
    import(/* webpackChunkName: "md" */'./md.js').then(({ markdown }) => {
      o.TEXT = markdown(o.TEXT)
      killXSS(o, render)
    })
  } else {
    killXSS(o, render)
  }
}
module.exports = MarkDown
