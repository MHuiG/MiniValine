const ajax = (options) => {
  options = options || {}
  options.type = (options.type || 'GET').toUpperCase()
  options.dataType = options.dataType || 'json'
  const params = formatParams(options.data)
  let xhr = null
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      const status = xhr.status
      let responseText = xhr.responseText
      let responseXML = xhr.responseXML
      try {
        responseText = JSON.parse(responseText)
        responseXML = JSON.parse(responseXML)
      } catch (e) {
        console.error(responseText)
        console.error(e)
      }
      if (status >= 200 && status < 300) {
        if (options.success) {
          try {
            options.success(responseText, responseXML)
          } catch (e) {
            console.error(responseText)
            console.error(e)
          }
        }
      } else {
        options.error && options.error(status, responseText)
      }
    }
  }
  if (options.type == 'GET') {
    xhr.open('GET', options.url + '?' + params, true)
    xhr.send(null)
  } else if (options.type == 'POST') {
    xhr.open('POST', options.url, true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(params)
  }
}
const formatParams = (data) => {
  const arr = []
  for (const name in data) {
    arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
  }
  arr.push(('v=' + Math.random()).replace('.', ''))
  return arr.join('&')
}
module.exports = ajax
