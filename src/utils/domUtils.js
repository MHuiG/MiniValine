const win = window
const doc = document

const unescapeMap = {}
const escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#x60;',
  '\\': '&#x5c;'
}
for (const key in escapeMap) {
  if (escapeMap.hasOwnProperty(key)) {
    unescapeMap[escapeMap[key]] = key
  }
}

const reUnescapedHtml = /[&<>"'`\\]/g
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source)
const reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#x60|#x5c);/g
const reHasEscapedHtml = RegExp(reEscapedHtml.source)

const utils = {
  /**
     * 检测DOM是否加载完毕
     * @param {Function} callback
     */
  domReady (callback) {
    if (doc.readyState === 'complete' || (doc.readyState !== 'loading' && !doc.documentElement.doScroll)) { setTimeout(() => callback && callback(), 0) } else {
      const handler = () => {
        doc.removeEventListener('DOMContentLoaded', handler, false)
        win.removeEventListener('load', handler, false)
        callback && callback()
      }
      doc.addEventListener('DOMContentLoaded', handler, false)
      win.addEventListener('load', handler, false)
    }
  },
  /**
     * 动态加载资源库
     * @param {String} sourceName 资源名 script/link
     * @param {Object} attrs 需要加载属性/值
     * @param {Function} callback 回调函数
     */
  dynamicLoadSource (sourceName, attrs, callback) {
    const attrNameMap = { script: 'src', link: 'href' }
    const attr = attrNameMap[sourceName]
    if (utils.find(doc, `${sourceName}[${attr}="${attrs[attr]}"]`)) {
      typeof (callback) === 'function' && callback()
    } else {
      const s = utils.create(sourceName, attrs)
      const h = doc.getElementsByTagName('head')[0]
      h.appendChild(s)
      s.onload = s.onreadystatechange = function () {
        const vm = this
        if (!0 || vm.readyState === 'loaded' || vm.readyState === 'complete') {
          vm.onload = vm.onreadystatechange = null
          typeof (callback) === 'function' && callback()
        }
      }
    }
  },
  on (type, el, handler, capture) {
    type = type.split(' ')
    for (let i = 0, len = type.length; i < len; i++) {
      utils.off(type[i], el, handler, capture)
      if (el.addEventListener) el.addEventListener(type[i], handler, capture || false)
      else if (el.attachEvent) el.attachEvent(`on${type[i]}`, handler)
      else el[`on${type[i]}`] = handler
    }
  },
  off (type, el, handler, capture) {
    type = type.split(' ')
    for (let i = 0, len = type.length; i < len; i++) {
      if (el.removeEventListener) el.removeEventListener(type, handler, capture || false)
      else if (el.detachEvent) el.detachEvent(`on${type}`, handler)
      else el[`on${type}`] = null
    }
  },

  escape (s) {
    return (s && reHasUnescapedHtml.test(s))
      ? s.replace(reUnescapedHtml, (chr) => escapeMap[chr])
      : s
  },

  unescape (s) {
    return (s && reHasEscapedHtml.test(s))
      ? s.replace(reEscapedHtml, (entity) => unescapeMap[entity])
      : s
  },
  /**
     * Create Element
     * @param {String} name ElementTagName
     * @param {Object} attrName
     * @param {Object} attrVal
	 * @return {Object} el
     */
  create (name, attrName, attrVal) {
    const el = document.createElement(name)
    utils.attr(el, attrName, attrVal)
    return el
  },
  /**
     * el.querySelector
     * @param {HTMLElement} el HTMLElement
     * @param {String} selector
	 * @return {Object} el.querySelector(selector)
     */
  find (el, selector) {
    return el.querySelector(selector)
  },

  /**
     * el.querySelectorAll
     * @param {HTMLElement} el HTMLElement
     * @param {String} selector
	 * @return {Object} el.querySelectorAll(selector)
     */
  findAll (el, selector) {
    return el.querySelectorAll(selector)
  },

  /**
     * get/set attributes
     * @param {HTMLElement} el
     * @param {String | Object} name
     * @param {String} value
	 * @return {Object} el.getAttribute(name)
     */
  attr (el, name, value) {
    if (typeof el.getAttribute === 'undefined') return utils.prop(el, name, value)
    if (value !== undefined) {
      if (value === null) utils.removeAttr(el, name)
      else el.setAttribute(name, value)
    } else if (({}).toString.call(name) === '[object Object]') {
      utils.each(name, (k, v) => {
        el.setAttribute(k, v)
      })
    } else return el.getAttribute(name)
  },
  /**
     * get/set props
     * @param {HTMLElement} el
     * @param {String} name
     * @param {String} value
	 * @return {Object} el[name]
     */
  prop (el, name, value) {
    if (value !== undefined) { el[name] = value; return el[name] } else if (({}).toString.call(name) === '[object Object]') {
      utils.each(name, (k, v) => {
        el[k] = v
      })
    } else return el[name]
  },
  /**
     * Remove el attribute
     * @param {HTMLElement} el
     * @param {String} names
     * @return {HTMLElement} el
     */
  removeAttr (el, names) {
    let name
    let i = 0
    // Attribute names can contain non-HTML whitespace characters
    // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
    const attrNames = names && names.match(/[^\x20\t\r\n\f*/\\]+/g)
    if (attrNames && el.nodeType === 1) {
      while ((name = attrNames[i++])) {
        el.removeAttribute(name)
      }
    }
    return el
  },
  /**
     * Clear element attributes
     * @param {HTMLElement} el
	 * @return {Object}
     */
  clearAttr (el) {
    const attrs = el.attributes
    const ignoreAttrs = ['align', 'alt', 'checked', 'class', 'disabled', 'href', 'id', 'target', 'title', 'type', 'src', 'style']
    utils.each(attrs, (idx, attr) => {
      const name = attr.name
      const style = attr.value
      const clazz = attr.value
      switch (name.toLowerCase()) {
        case 'style':
          utils.each(style.split(';'), (idx, item) => {
            if (item.indexOf('color') > -1) utils.attr(el, 'style', item)
            else utils.removeAttr(el, 'style')
          })
          break
        case 'class':
          if (el.nodeName === 'CODE') return false

          if (clazz.indexOf('at') > -1) utils.attr(el, 'class', 'at')
          else if (clazz.indexOf('vemoji') > -1) utils.attr(el, 'class', 'vemoji')
          else utils.removeAttr(el, 'class')
          break
        default:
          if (ignoreAttrs.indexOf(name) > -1) return true
          else utils.removeAttr(el, name)
          break
      }
    })
    return el
  },
  /**
     * Remove Child node
     * @param {HTMLElement} child
     */
  remove (child) {
    try {
      if (child.parentNode) child.parentNode.removeChild(child)
    } catch (error) {}
  },

  /**
     * 遍历对象或者数组
     * collection, callback(indexInArray, valueOfElement)
     * @param {Object} collection
     * @param {Function} callback
     * @return {Object} collection
     */
  each (collection, callback) {
    let i = 0
    const length = collection.length
    const likeArray = ['[object Array]', '[object NodeList]']
    const type = ({}).toString.call(collection)
    if (likeArray.indexOf(type) > -1) {
      for (; i < length; i++) {
        if (callback && callback.call(collection[i], i, collection[i]) === false) break
      }
    } else {
      for (i in collection) {
        if (collection.hasOwnProperty(i)) {
          if (callback && callback.call(collection[i], i, collection[i]) === false) break
        }
      }
    }
    return collection
  }
}

module.exports = utils
