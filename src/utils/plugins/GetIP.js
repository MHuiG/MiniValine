import ajax from './ajax'
const GetIP = (root) => {
  try {
    ajax({
      url: 'https://ip.zxinc.org/api.php',
      type: 'GET',
      data: {
        type: 'json'
      },
      success: function (data) {
        window.MV.fuck = 1
        window.MV.region = data
        root.C.ip = data.data.myip
        window.MV.ip = root.C.ip
      }
    })
  } catch (e) {}
}
module.exports = GetIP
