const Bean = () => {
  this.set = function (a, b) {
    this[a] = b
  }
  this.get = function (a) {
    return this[a]
  }
}
module.exports = Bean
