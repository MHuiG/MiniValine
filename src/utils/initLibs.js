const initLibs = (root) => {
  const checkie = setInterval(function () {
    if (typeof Promise == 'undefined') { return }
    clearInterval(checkie)
    import(/* webpackChunkName: "lib" */'./plugins/lib.js').then(({ lib }) => {
      lib()
      if (root.backend == 'lc') {
        import(/* webpackChunkName: "lib-av" */'./plugins/lib-AV.js').then(({ lib }) => {
          lib()
          root.initCheck()
        })
      } else {
        root.initCheck()
      }
    })
  }, 5)
}
module.exports = initLibs
