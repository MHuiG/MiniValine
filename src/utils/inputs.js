import dom from './plugins/dom'
const inputs = (root) => {
  root.inputs = Object.create(null)
  root.mapping = {
    veditor: 'comment',
    vnick: 'nick',
    vlink: 'link',
    vmail: 'mail'
  }
  for (const i in root.mapping) {
    if (root.mapping.hasOwnProperty(i)) {
      const _v = root.mapping[i]
      const _el = root.el.querySelector(`.${i}`)
      root.inputs[_v] = _el
      dom.on('input', _el, (e) => {
        root.C[_v] = _el.value
      })
      if (i == 'veditor') {
        dom.on('input', _el, (e) => {
          window.MV.VDL = _el.value.length
          if (!window.MV.VDPI) {
            window.MV.VDPI = 1
            const VDI = setInterval(() => {
              if (window.MV.VDL != _el.value.length) {
                window.MV.VDL = _el.value.length
                window.MV.VDP = 0
              } else {
                window.MV.VDP = 1
              }
              if (window.MV.VDP) {
                root.previewEvt(root)
                clearInterval(VDI)
                window.MV.VDP = 0
                window.MV.VDPI = 0
              }
            }, 2500)
          }
        })
      }
    }
  }
}
module.exports = inputs
