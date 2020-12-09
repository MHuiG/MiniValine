const visitor = (root) => {
  if (root.config.visitor) {
    import(/* webpackChunkName: "visitor" */'./counter/').then(({ MCo }) => {
      MCo(root.config)
    })
  }
}
module.exports = visitor
