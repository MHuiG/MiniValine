function Bean () {
  this.set = function (a, b) {
    this[a] = b
  }
  this.get = function (a) {
    return this[a]
  }
  this.create = function (it) {
    this.set('nick', it.nick)
    this.set('mailMd5', it.mail)
    this.set('link', it.link)
    this.set('createdAt', new Date(it.createdAt))
    this.set('id', it.objectId)
    this.set('browser', it.browser)
    this.set('os', it.os)
    this.set('comment', it.comment)
    const item = new Bean()
    this.set('children', item.beanList(it.children))
  }
  this.beanList = function (data) {
    const list = []
    if (data && data.length) {
      for (let i = data.length - 1; i >= 0; i--) {
        const item = new Bean()
        item.create(data[i])
        list.push(item)
      }
    }
    return list
  }
}
module.exports = Bean
