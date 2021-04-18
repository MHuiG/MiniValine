import ajax from './ajax'
const MakeComment = (root, o, render) => {
  const ls = root.C.comment.match(/!\(:(.*?\.\w+):\)/g)
  if (ls) {
    for (let i = 0; i < ls.length; i++) {
      const m = ls[i].match(/!\(:(.*?\.\w+):\)/)[1]
      const em = root.emoticon[m]
      const R = new RegExp('!\\(:' + m.replace(/\./, '\\.') + ':\\)', 'g')
      root.C.comment = root.C.comment.replace(R, `![${m}](${em})`)
    }
  }
  const url = `${root.conf.serverURL}/md`
  ajax({
    url: url,
    type: 'POST',
    data: {
      s: root.C.comment
    },
    success: function (data) {
      o.innerHTML = data
      render(o)
    },
    error: root.error
  })
}
module.exports = MakeComment
