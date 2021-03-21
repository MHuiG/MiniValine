import ajax from '../../plugins/ajax'

export function Counter (root) {
  const url = `${root.conf.serverURL}/article`
  ajax({
    url: url,
    type: 'POST',
    data: {
      path: root.conf.path
    },
    success: function (data) {
      try {
        document.querySelectorAll('.leancloud_visitors,.leancloud-visitors')[0].querySelector('.leancloud-visitors-count').innerText = typeof data === 'number' ? data : data.data[0].time
      } catch (e) {}
    },
    error: root.error
  })
}
