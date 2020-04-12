const insertAtCaret = (field, val) => {
  if (document.selection) {
    // For browsers like Internet Explorer
    field.focus()
    const sel = document.selection.createRange()
    sel.text = val
    field.focus()
  } else if (field.selectionStart || field.selectionStart == '0') {
    // For browsers like Firefox and Webkit based
    const startPos = field.selectionStart
    const endPos = field.selectionEnd
    const scrollTop = field.scrollTop
    field.value = field.value.substring(0, startPos) + val + field.value.substring(endPos, field.value.length)
    field.focus()
    field.selectionStart = startPos + val.length
    field.selectionEnd = startPos + val.length
    field.scrollTop = scrollTop
  } else {
    field.focus()
    field.value += val
  }
}

module.exports = insertAtCaret
