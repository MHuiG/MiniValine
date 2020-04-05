import MarkDown from './plugins/MarkDown'
const MakeComment = (root,o,render) => {
  o.TEXT=root.Comment.comment.replace(/!\(:(.*?\.\w+):\)/g, `<img src="${root.emoticonUrl}/$1" alt="$1" class="vemoticon-img">`)
  MarkDown(root,o, render)
}
module.exports = MakeComment
