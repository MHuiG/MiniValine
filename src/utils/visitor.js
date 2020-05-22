const visitor = (root) => {
  if ((typeof root.visitor == 'undefined') || (root.visitor)) {
    new MCounter({
      appId: root.config.appId,
      appKey: root.config.appKey
    })
  }
}
module.exports = visitor
