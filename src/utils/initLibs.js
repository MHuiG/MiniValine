const initLibs = (root) => {
  import(/* webpackChunkName: "lib" */'./plugins/lib.js').then(({ lib }) => {
    lib()
    root.initCheck()
  })
}
module.exports = initLibs
