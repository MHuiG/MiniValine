const visitor = (root) => {
  if ((typeof root.visitor == 'undefined') || (root.visitor)) {
    import(/* webpackChunkName: "visitor" */'./counter/').then(({ MCo }) => {
      MCo(root.config)
    })
  }
}
module.exports = visitor
