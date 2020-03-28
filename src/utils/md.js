import 'highlight.js/styles/github.css'
import md from 'marked'

import highligher from './highlight'

md.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: true,
  highlight (code) {
    return highligher.highlightAuto(code).value
  }
})

module.exports = md
