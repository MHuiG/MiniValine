import utils from '../../src/utils'
import MiniValine from '../../src/index.js'
import i18n from '../../src/i18n'
import timeAgo from '../../src/utils/timeago'

test('GetIP', () => {
  utils.GetIP()
  getIP({ ip: '192.168.1.1' })
})

test('initAV', () => {
  try {
    document.body.innerHTML = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body><div class="comment"></div></body></html>'
    MiniValine({
      el: '.comment',
      appId: 'zhM0AOiqle17oPoE84CoYw1e-gzGzoHsz',
      appKey: 'itmzT1JbXfAjVwMqDhGPzU45',
      placeholder: 'Write a Comment',
      lang: 'en'
    })
    utils.initAV(MiniValine)
  } catch (e) {}
})

test('MathJax', () => {
  document.body.innerHTML = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body><div class="comment"></div></body></html>'
  utils.MathJaxSupport(true)
  const MathJax = true
  utils.MathJaxSupport(true)
})

test('check', () => {
  document.body.innerHTML = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body><div class="comment"></div></body></html>'
  utils.check.mail('110@qq.com')
  utils.check.link('https://www.baidu.com/')
})

test('timeAgo', () => {
  document.body.innerHTML = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body><div class="comment"></div></body></html>'
  const i18nn = i18n('en')
  var date = {
    getTime: () => { return '17:33:43' },
    getDate: () => { return '21' },
    getMonth: () => { return '03' },
    getFullYear: () => { return '2020' }
  }
  timeAgo(date, i18nn)
  date = {
    getTime: () => { return new Date().getTime() },
    getDate: () => { return new Date().getDate },
    getMonth: () => { return new Date().getMonth },
    getFullYear: () => { return new Date().getFullYear }
  }
  timeAgo(date, i18nn)
})
