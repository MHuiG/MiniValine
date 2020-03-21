import 'highlight.js/styles/github.css'
import md from 'marked'

md.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: true,
  highlight (code) {
    return require('highlight.js').highlightAuto(code).value
  }
})

module.exports = md
