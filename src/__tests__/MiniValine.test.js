import MiniValine from '../index.js'
test('MiniValine', () => {
  document.body.innerHTML = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body><div class="comment"></div></body></html>'
  MiniValine({
    el: '.comment',
    appId: 's1UXuqJzhVJMt6uMz5bKD6qW-gzGzoHsz',
    appKey: 'TwjpsjDesTnAK4Ot8y6k9wpw',
    placeholder: 'Write a Comment',
    lang: 'en',
    pathname: '/guestbook/index.html',
    adminEmailMd5: 'DE8A7AA53D07E6B6BCEB45C64027763D'
  })
})
