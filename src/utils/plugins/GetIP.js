const GetIP = (root) => {
  window.getIP = (json) => {
    root.C.ip = json.ip
  }
}
module.exports = GetIP
