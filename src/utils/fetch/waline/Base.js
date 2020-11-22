import ajax from '../../plugins/ajax'
export function FetchBase (root) {
  root.fetchCount = (root) => {
    const url = `${root.config.serverURLs}/comment`
    try {
      ajax({
        url: url,
        type: 'GET',
        data: {
          type: 'count',
          url: root.config.pathname
        },
        success: function (data) {
          // console.log(data)
          root.el.querySelector('.count').innerHTML = data
        }
      })
    } catch (e) {
      console.log(e)
      root.el.querySelector('.count').innerHTML = 0
    }
  }
  root.fetchParentList = (root, pageNum, callback) => {

  }
  root.fetchParentCount = (root, callback) => {

  }
  root.fetchNextList = (root, _id, callback) => {

  }
  root.fetchNextCount = (root, _id, callback) => {

  }
  root.postComment = (root, callback) => {

  }
}
