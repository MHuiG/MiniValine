import ajax from '../../plugins/ajax'
import Bean from '../Bean'
export function FetchBase (root) {
  root.fetchCount = (root) => {
    const url = `${root.config.serverURLs}/comment`
    ajax({
      url: url,
      type: 'GET',
      data: {
        type: 'count',
        url: root.config.pathname
      },
      success: function (data) {
        root.el.querySelector('.count').innerHTML = data
      }
    })
  }
  root.fetchParentList = (root, pageNum, callback) => {
    const url = `${root.config.serverURLs}/comment`
    ajax({
      url: url,
      type: 'GET',
      data: {
        path: root.config.pathname,
        pageSize: root.pageSize,
        page: pageNum
      },
      success: function (data) {
        data = eval('(' + data + ')')
        console.log(data.data[0])
        const item = new Bean()
        item.set('nick', data.data[0].nick)
        console.log(item.get('nick'))
      }
    })
  }
  root.fetchParentCount = (root, callbackfun) => {
    callbackfun(1) // test
  }
  root.fetchNextList = (root, _id, callback) => {

  }
  root.fetchNextCount = (root, _id, callback) => {

  }
  root.postComment = (root, callback) => {

  }
}
