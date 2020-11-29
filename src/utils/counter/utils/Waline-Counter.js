import ajax from '../../plugins/ajax'

export function Counter (root) {
  const url = `${root.config.serverURLs}/article`
  ajax({
    url: url,
    type: 'POST',
    data: {
      path: root.config.pathname
    },
    success: function (data) {
      try {
        document.querySelectorAll('.leancloud_visitors,.leancloud-visitors')[0].querySelector('.leancloud-visitors-count').innerText = data.data[0].time
      } catch (e) {}
    }
  })
}
