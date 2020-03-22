import MiniValine from '../../src/index.js'

test('MiniValine', () => {
  document.body.innerHTML = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body><div class="comment"></div></body></html>'
  window.AV = require('leancloud-storage');
  MiniValine({
	el: '.comment',
	appId: 'zhM0AOiqle17oPoE84CoYw1e-gzGzoHsz',
	appKey: 'itmzT1JbXfAjVwMqDhGPzU45',
	placeholder: 'Write a Comment',
	lang: 'en',
	pathname: 'TestPath',
	adminEmailMd5: 'DE8A7AA53D07E6B6BCEB45C64027763D',
	math: true
  })
  const $ = require('jquery')
  $('.commentTrigger').click()
  $(".veditor").val("$$f(x)=abc$$")
  $('.vpreview-btn').click()
  $(".veditor").val('```\nprint("a=0")\n```')
  $(".vnick").val('vnick')
  $(".vmail").val('110@qq.com')
  $(".vlink").val('https://www.baidu.com/')
  $('.vpreview-btn').click()
  $('.vsubmit').click()
  $('.vsmile-icons').click()
  $('.vcancel-comment-reply').click()
  $('.vpreview-text').click()
})
