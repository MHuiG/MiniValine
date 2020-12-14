import ajax from '../../plugins/ajax'

export function Counter (root) {
  const url = `${root.serverURL}/article`
  ajax({
    url: url,
    type: 'POST',
    data: {
      path: root.path
    },
    success: function (data) {
      try {
        document.querySelectorAll('.leancloud_visitors,.leancloud-visitors')[0].querySelector('.leancloud-visitors-count').innerText = data.data[0].time
      } catch (e) {}
    },
    error: root.error
  })
}
