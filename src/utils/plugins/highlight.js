const highligher = require('highlight.js/lib/core')

highligher.registerLanguage('css', require('highlight.js/lib/languages/css'))
highligher.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
highligher.registerLanguage('json', require('highlight.js/lib/languages/json'))
highligher.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
highligher.registerLanguage('shell', require('highlight.js/lib/languages/shell'))
highligher.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'))
highligher.registerLanguage('python', require('highlight.js/lib/languages/python'))
highligher.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))

module.exports = highligher
