const smiles = function (root) {
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
}
module.exports = smiles
