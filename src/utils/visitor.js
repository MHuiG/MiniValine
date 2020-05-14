const visitor = (root) => {
  if (root.visitor) {
    import(/* webpackChunkName: "counter" */'./plugins/Counter').then(({ Counter }) => {
      Counter()
      CounterFactory.add(AV.Object.extend('Counter'), root.config.pathname)
    })
  }
}
module.exports = visitor
