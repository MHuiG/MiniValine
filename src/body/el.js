const el = function (root) {
  const el = Object.prototype.toString.call(root.conf.el) === '[object HTMLDivElement]'
    ? root.conf.el
    : document.querySelectorAll(root.conf.el)[0]
  if (Object.prototype.toString.call(el) !== '[object HTMLDivElement]') {
    return
  }
  root.el = el
  root.el.classList.add('MiniValine')
  root.el.classList.add('markdown-body')
  root.el.innerHTML = root.ele
}
module.exports = el
