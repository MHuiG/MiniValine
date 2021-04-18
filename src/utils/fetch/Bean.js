function Bean () {
  this.set = function (a, b) {
    this[a] = b
  }
  this.get = function (a) {
    return this[a]
  }
  this.create = function (it) {
    this.set('nick', it.nick)
    this.set('mailMd5', it.mailMd5)
    this.set('link', it.link)
    this.set('createdAt', new Date(it.createdAt))
    this.set('id', it.id)
    this.set('rid', it.rid)
    this.set('pid', it.pid)
    this.set('browser', it.browser)
    this.set('os', it.os)
    this.set('comment', it.comment)
    const item = new Bean()
    this.set('children', item.beanList(it.children))
  }
  this.beanList = function (data) {
    const list = []
    if (data && data.length) {
      for (let i = 0; i < data.length; i++) {
        const item = new Bean()
        item.create(data[i])
        list.push(item)
      }
    }
    return list
  }
}
module.exports = Bean
