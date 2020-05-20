const visitor = (root) => {
  if (root.visitor) {
    var vispath = root.config.vispath ? root.config.vispath : root.config.pathname
    new MCounter({
      appId: root.config.appId,
      appKey: root.config.appKey,
      vispath: vispath || location.pathname.replace(/\/$/, '')
    })
  }
}
module.exports = visitor
