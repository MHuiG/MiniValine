const loading = function (root) {
// Empty Data
  const vempty = root.el.querySelector('.vempty')
  root.nodata = {
    show (txt) {
      vempty.innerHTML = txt || root.i18n.noCommentYet
      vempty.setAttribute('style', 'display:block;')
    },
    hide () {
      vempty.setAttribute('style', 'display:none;')
    }
  }
  // loading
  const spinner = '<div class="spinner"><div class="r1"></div><div class="r2"></div><div class="r3"></div><div class="r4"></div><div class="r5"></div></div>'
  const vloading = root.el.querySelector('.vloading')
  vloading.innerHTML = spinner
  root.loading = {
    show () {
      vloading.setAttribute('style', 'display:block;')
      root.nodata.hide()
    },
    hide (TotalPages) {
      vloading.setAttribute('style', 'display:none;')
      TotalPages === 0 && root.nodata.show()
    }
  }
  // submitting
  const vsubmitting = root.el.querySelector('.vsubmitting')
  vsubmitting.innerHTML = spinner
  root.submitting = {
    show () {
      vsubmitting.setAttribute('style', 'display:block;')
    },
    hide () {
      vsubmitting.setAttribute('style', 'display:none;')
      root.nodata.hide()
    }
  }
}

module.exports = loading
