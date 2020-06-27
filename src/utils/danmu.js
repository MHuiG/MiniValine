const danmu = (root) => {
  import(/* webpackChunkName: "danmu" */'./plugins/danmu.js').then(({ danmu }) => {
    danmu()
  })
}
module.exports = danmu
