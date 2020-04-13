import dom from './plugins/dom'
const cancelReply = (root) => {
  dom.on('click', root.el.querySelector('.cancel-reply-btn'), (e) => {
    root.reset()
  })
}
module.exports = cancelReply
