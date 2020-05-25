// import ajax from './ajax'
const GetIP = (root) => {
  window.getIP = (json) => {
    root.C.ip = json.ip
    window.MV.ip = root.C.ip
    /* ajax({
      url: 'http://smallsite.online:8085/lookUp',
      type: 'GET',
      data: {
        ip: window.MV.ip
      },
      success: function (data) {
        data = eval('(' + data + ')')
        window.MV.region = data
      }
    }) */
  }
}
module.exports = GetIP
