const smiles = function (root) {
  var checksmiles = setInterval(function () {
    if (typeof root.emoticonList == 'undefined') return
    clearInterval(checksmiles)
    const smileWrapper = root.el.querySelector('.vsmile-icons ul')
    const smileBar = root.el.querySelector('.vsmile-bar ul')
    const smileList = root.emoticonList || []
    for (var i = 0; i < smileList.length; i++) {
      var li = document.createElement('li')
      var barli = document.createElement('li')
      for (var j = 0; j < smileList[i].length; j++) {
        var img = document.createElement('img')
        img.setAttribute(
          'data-src',
          `${smileList[i][j]}`
        )
        img.setAttribute('class', 'lazyload')
        li.appendChild(img)
        if (j === 0) {
		  var img = document.createElement('img')
          img.setAttribute('src', `${smileList[i][0]}`)
          img.removeAttribute('class', 'lazyload')
          barli.appendChild(img)
        }
      }
      smileWrapper.appendChild(li)
      smileBar.appendChild(barli)
    }
    root.el.querySelector('.vsmile-icons > ul > li:nth-child(1)').style.display = 'block'
    var btn = document.querySelectorAll('.vsmile-bar > ul > li')
    var show = document.querySelectorAll('.vsmile-icons > ul > li')
    for (var k = 0; k < btn.length; k++) {
      // 把当前按钮的下标保存，按下按钮对应显示下标一致的盒子，其它盒子隐藏
      btn[k].index = k
      btn[k].onclick = function () {
        // 遍历每个按钮样式清空
        // 遍历每个盒子隐藏
        for (var j = 0; j < btn.length; j++) {
          btn[j].className = ''
          show[j].style.display = 'none'
        }
        // this表示当前按钮
        this.className = 'active'
        // 盒子显示按钮下标的那个盒子，this。index是开始时保存的按钮下标
        show[this.index].style.display = 'block'
      }
    }
  }, 10)
}
module.exports = smiles
