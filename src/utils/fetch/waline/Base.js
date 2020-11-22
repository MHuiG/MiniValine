import ajax from '../../plugins/ajax'
import Bean from './Bean'
export function FetchBase (root) {
  const url = `${root.config.serverURLs}/comment`
  root.fetchCount = (root) => {
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
  root.fetchTotalPages = (root, callback) => {
    ajax({
      url: url,
      type: 'GET',
      data: {
        path: root.config.pathname,
        pageSize: root.pageSize,
        page: 1
      },
      success: function (data) {
        data = eval('(' + data + ')')
        window.MV.WalinePageData = data
        console.log(data)
        callback(data.totalPages)
      }
    })
  }
  root.fetchParentList = (root, pageNum, callback) => {
    if (pageNum == 1) {
      const item = new Bean()
      const a = item.beanList(window.MV.WalinePageData.data)
      console.log(a)
      callback(a)
    } else {
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
          window.MV.WalinePageData = data
          const item = new Bean()
          const a = item.beanList(data.data)
          callback(a)
        }
      })
    }
  }
  root.fetchNextList = (root, _id, callback) => {
    console.log(window.MV.WalinePageData)
    console.log(_id)
  }
  root.fetchNextCount = (root, _id, callback) => {

  }
  root.postComment = (root, callback) => {

  }
}
