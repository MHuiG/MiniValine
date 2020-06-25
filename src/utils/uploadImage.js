import dom from './plugins/dom'
import insertAtCaret from './insertAtCaret'
const uploadImage = (root) => {
  const _veditor = root.el.querySelector('.veditor')
  dom.on('keydown', document, function (e) {
    e = event || e
    const keyCode = e.keyCode || e.which || e.charCode
    const ctrlKey = e.ctrlKey || e.metaKey
    // Shortcut key
    ctrlKey && keyCode === 13 && root.submitEvt()
    // tab key
    if (keyCode === 9) {
      const focus = document.activeElement.className || ''
      if (focus == 'veditor') {
        e.preventDefault()
        insertAtCaret(_veditor, '    ')
      }
    }
  })
  const walkfile = (files) => {
    if (files.length) {
      for (var idx = 0; idx < files.length; idx++) {
        const file = files[idx]
        const uploadText = `![Uploading ${file.name}]()`
        insertAtCaret(_veditor, uploadText)
        loadImage(file, function (err, ret) {
          if (!err && ret) {
            _veditor.value = _veditor.value.replace(uploadText, `\r\n![${file.name}](${ret.data})`)
            root.C.comment = _veditor.value
          }
        })
      }
    }
  }
  dom.on('paste', document, (e) => {
    const clipboardData = 'clipboardData' in e ? e.clipboardData : ((e.originalEvent && e.originalEvent.clipboardData) || window.clipboardData)
    const items = clipboardData && clipboardData.items
    const files = []
    if (items && items.length > 0) {
      // 检索剪切板items
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          files.push(items[i].getAsFile())
          break
        }
      }
      walkfile(files)
    }
  })
  const loadImage = (file, callback) => {
    const formData = new FormData()
    formData.append('file', file)
    const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          const json = JSON.parse(xhr.responseText)
          callback && callback(null, json)
        } catch (err) {
          callback && callback(err)
        }
      } else {
        callback && callback(xhr.status)
      }
    }
    xhr.onerror = function (e) {
      console.log(e)
    }
    xhr.open('POST', 'https://imgkr.com/api/files/upload', true)
    xhr.send(formData)
  }
  var dashboard = document.getElementsByClassName('veditor')[0]
  dashboard.addEventListener('dragover', function (e) {
    e.preventDefault()
    e.stopPropagation()
  })
  dashboard.addEventListener('dragenter', function (e) {
    e.preventDefault()
    e.stopPropagation()
  })
  dashboard.addEventListener('drop', function (e) {
    e.preventDefault()
    e.stopPropagation()
    var files = this.files || e.dataTransfer.files
    walkfile(files)
  })
}
module.exports = uploadImage
