import dom from './dom'
const cancelReply = (root) => {
  dom.on('click', root.el.querySelector('.vcancel-comment-reply'), (e) => {
    root.reset()
  })
}
module.exports = cancelReply
