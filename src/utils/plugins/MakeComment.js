import MarkDown from './MarkDown'
const MakeComment = (root, o, render) => {
  const ls = root.C.comment.match(/!\(:(.*?\.\w+):\)/g)
  if (ls) {
    for (let i = 0; i < ls.length; i++) {
      const m = ls[i].match(/!\(:(.*?\.\w+):\)/)[1]
      const em = root.emoticon[m]
      const R = new RegExp('!\\(:' + m.replace(/\./, '\\.') + ':\\)', 'g')
      if (root.backend == 'lc') {
        root.C.comment = root.C.comment.replace(R, `<img src="${em}" alt="${m}" class="vemoticon-img">`)
      } else if (root.backend == 'waline') {
        root.C.comment = root.C.comment.replace(R, `![${m}](${em})`) // waline必须启用 markdown
      }
    }
  }
  o.TEXT = root.C.comment
  MarkDown(root, o, render)
}
module.exports = MakeComment
