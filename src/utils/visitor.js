const visitor = (root) => {
  if (root.conf.visitor) {
    import(/* webpackChunkName: "visitor" */'./counter/').then(({ MCo }) => {
      MCo(root.conf)
    })
  }
}
module.exports = visitor
