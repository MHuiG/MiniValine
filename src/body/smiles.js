const smiles = function (root) {
  const checksmiles = setInterval(function () {
    if ((typeof root.emoticonList == 'undefined') || (root.emoticonList.length === 0)) return
    clearInterval(checksmiles)
    const smileWrapper = root.el.querySelector('.vsmile-icons ul')
    const smileBar = root.el.querySelector('.vsmile-bar ul')
    const smileList = root.emoticonList || []
    for (let i = 0; i < smileList.length; i++) {
      const li = document.createElement('li')
      const barli = document.createElement('li')
      for (let j = 0; j < smileList[i].length; j++) {
        let img = document.createElement('img')
        img.setAttribute(
          'data-src',
          `${smileList[i][j]}`
        )
        img.setAttribute('class', 'lazyload')
        try { li.appendChild(img) } catch (e) {}
        if (j === 0) {
          img = document.createElement('img')
          img.setAttribute('src', `${smileList[i][0]}`)
          img.removeAttribute('class', 'lazyload')
          try { barli.appendChild(img) } catch (e) {}
        }
      }
      try { smileWrapper.appendChild(li) } catch (e) {}
      try { smileBar.appendChild(barli) } catch (e) {}
    }
    try {
      root.el.querySelector('.vsmile-icons > ul > li:nth-child(1)').style.display = 'block'
      const btn = document.querySelectorAll('.vsmile-bar > ul > li')
      const show = document.querySelectorAll('.vsmile-icons > ul > li')
      for (let k = 0; k < btn.length; k++) {
      // 把当前按钮的下标保存，按下按钮对应显示下标一致的盒子，其它盒子隐藏
        btn[k].index = k
        btn[k].onclick = function () {
        // 遍历每个按钮样式清空
        // 遍历每个盒子隐藏
          for (let j = 0; j < btn.length; j++) {
            btn[j].className = ''
            show[j].style.display = 'none'
          }
          // this表示当前按钮
          this.className = 'active'
          // 盒子显示按钮下标的那个盒子，this。index是开始时保存的按钮下标
          show[this.index].style.display = 'block'
        }
      }
    } catch (e) {}
  }, 10)
}
module.exports = smiles
