import MiniValine from '../index.js'
test('MiniValine', () => {
  document.body.innerHTML = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body><div class="comment"></div></body></html>'
  MiniValine({
    el: '.comment',
    appId: 's1UXuqJzhVJMt6uMz5bKD6qW-gzGzoHszpppkmy',
    appKey: 'TwjpsjDesTnAK4Ot8y6k9wpwkmvmk',
    placeholder: 'Write a Comment',
    lang: 'en'
  })
})
