const initCount = (root) => {
  const query1 = new root.v.Query('Comment')
  query1.equalTo('url', root.C.url)
  const query2 = new root.v.Query('Comment')
  query2.equalTo('url', `${root.C.url}/`)
  const query = AV.Query.or(query1, query2)
  query.notEqualTo('isSpam', true)
  query.count().then((count) => {
    root.el.querySelector('.count').innerHTML = count
  }).catch((ex) => {
    console.log(ex)
    root.el.querySelector('.count').innerHTML = 0
  })
}
module.exports = initCount
