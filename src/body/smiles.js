const smiles = function (root) {
    var checksmiles = setInterval(function () {
      if (typeof root.emoticonList == 'undefined') { return }
      clearInterval(checksmiles)
  const smileWrapper = root.el.querySelector('.vsmile-icons')
  const smileNames = root.emoticonList || []
  for (const i in smileNames) {
    if (smileNames.hasOwnProperty(i)) {
      const img = document.createElement('img')
      img.setAttribute(
        'data-src',
          `${root.emoticonUrl}/${smileNames[i]}`
      )
      img.setAttribute('class', 'lazyload')
      smileWrapper.appendChild(img)
    }
  }
      }, 10)
}
module.exports = smiles
