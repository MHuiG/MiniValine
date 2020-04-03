const MakeComment = (root) => {
  return root.Comment.comment.replace(/!\(:(.*?\.\w+):\)/g, `<img src="${root.emoticonUrl}/$1" alt="$1" class="vemoticon-img">`)
}
module.exports = MakeComment
