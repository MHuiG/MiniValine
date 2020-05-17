const GetIP = (root) => {
  window.getIP = (json) => {
    root.C.ip = json.ip
    window.MV.ip = root.C.ip
  }
}
module.exports = GetIP
