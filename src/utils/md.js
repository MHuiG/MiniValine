import md from 'marked'
import highligher from './highlight'
import('highlight.js/styles/github.css')

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

export function markdown (o) {
  var m = md(o)
  return m
}
