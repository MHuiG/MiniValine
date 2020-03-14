
const check = {
  mail (m) {
    return {
      k: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(m),
      v: m
    }
  },
  link (l) {
    if (l.length > 0) {
      l = /^(http|https)/.test(l) ? l : `http://${l}`
    }
    return {
      k:
        l.length > 0
          ? /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/.test(
            l
          )
          : true,
      v: l
    }
  }
}
module.exports = check
