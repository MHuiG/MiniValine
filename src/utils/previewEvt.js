const previewEvt = (root) => {
  root.previewEvt = (root) => {
    const ls = root.C.comment.match(/!\(:(.*?\.\w+):\)/g)
    if (ls) {
      for (let i = 0; i < ls.length; i++) {
        const m = ls[i].match(/!\(:(.*?\.\w+):\)/)[1]
        const em = root.emoticon[m]
        const R = new RegExp('!\\(:' + m.replace(/\./, '\\.') + ':\\)', 'g')
        root.C.comment = root.C.comment.replace(R, `![${m}](${em})`)
      }
    }
    MV.websocket.send(JSON.stringify({ opt: 'previewEvt', msg: root.C.comment, tz: new Date() }))
  }
  root.previewEvtWS = (root, data) => {
    const previewBtn = root.el.querySelector('.vpreview-btn')
    const previewText = root.el.querySelector('.vpreview-text')
    const veditor = root.el.querySelector('.veditor')
    previewText.innerHTML = data
    previewText.removeAttribute('style')
    previewText.setAttribute('triggered', 1)
    previewBtn.classList.add('actived')
    if (veditor.value) autosize(veditor)
    else autosize.destroy(veditor)
  }
}
module.exports = previewEvt
