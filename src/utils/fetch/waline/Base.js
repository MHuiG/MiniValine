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
        callback(data.totalPages)
      }
    })
  }
  root.fetchParentList = (root, pageNum, callback) => {
    if (pageNum == 1) {
      const item = new Bean()
      window.MV.WalinePageList = item.beanList(window.MV.WalinePageData.data)
      callback(window.MV.WalinePageList)
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
          window.MV.WalinePageList = item.beanList(data.data)
          callback(window.MV.WalinePageList)
        }
      })
    }
  }
  root.fetchNextList = (root, id, callback) => {
    const list = []
    const data = window.MV.WalinePageList
    for (let i = 0; i < data.length; i++) {
      if (data[i].children) {
        for (let j = 0; j < data[i].children.length; j++) {
          if (id == data[i].children[j].rid) {
            list.push(data[i].children[j])
          }
        }
      }
    }
    callback(list)
  }
  root.fetchNextCount = (root, id, showMore) => {
    const list = []
    const data = window.MV.WalinePageList
    for (let i = 0; i < data.length; i++) {
      if (data[i].children) {
        for (let j = 0; j < data[i].children.length; j++) {
          if (id == data[i].children[j].rid) {
            list.push(data[i].children[j])
          }
        }
      }
    }
    if (list.length > 0) {
      showMore(1) // 显示加载更多
    }
  }
  root.postComment = (root, callback) => {

  }
}
