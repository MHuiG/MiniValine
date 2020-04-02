import ele from './ele'
const el = function (root) {
  const el = Object.prototype.toString.call(root.config.el) === '[object HTMLDivElement]'
    ? root.config.el
    : document.querySelectorAll(root.config.el)[0]
  if (Object.prototype.toString.call(el) !== '[object HTMLDivElement]') {
    return
  }
  root.el = el
  root.el.classList.add('MiniValine')
  root.el.innerHTML = ele(root)
}
module.exports = el
