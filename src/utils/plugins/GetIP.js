import ajax from './ajax'
const GetIP = (root) => {
  window.getIP = (json) => {
    root.C.ip = json.ip
    window.MV.ip = root.C.ip

    try {
      if (root.config.adminUrl) {
        if (window.MV.ip) {
          ajax({
            url: root.config.adminUrl + '/lookUp',
            type: 'GET',
            data: {
              ip: window.MV.ip
            },
            success: function (data) {
              data = eval('(' + data + ')')
              window.MV.region = data
            }
          })
        } else {
          ajax({
            url: root.config.adminUrl + '/getIp',
            type: 'GET',
            success: function (data) {
              data = eval('(' + data + ')')
              window.MV.region = data
              if (data.success) {
                window.MV.ip = data.data.ip
              }
            }
          })
        }
      }
    } catch (e) {}
  }
}
module.exports = GetIP
