const GetIP = (root) => {
  window.getIP = (json) => {
    root.Comment.ip = json.ip
  }
}
module.exports = GetIP
