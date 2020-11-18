const initLibs = (root) => {
  const checkie = setInterval(function () {
    if (typeof Promise == 'undefined') { return }
    clearInterval(checkie)
    import(/* webpackChunkName: "lib" */'./plugins/lib.js').then(({ lib }) => {
      lib()
      root.initCheck()
    })
  }, 5)
}
module.exports = initLibs
