import xss from 'xss'
export function XSS (o) {
  return xss(o, {
    onIgnoreTagAttr (tag, name, value, isWhiteAttr) {
      if (name === 'class') {
        return `${name}="${xss.escapeAttrValue(value)}"`
      }
    },
    onTag (tag, html, options) {
      if (tag === 'input' && (html.match(/<input disabled="" type="checkbox">/) || html.match(/<input checked="" disabled="" type="checkbox">/))) {
        return html
      }
    }
  })
}
