const visitor = (root) => {
  if (root.visitor) {
    new MCounter({
      appId: root.config.appId,
      appKey: root.config.appKey
    })
  }
}
module.exports = visitor
